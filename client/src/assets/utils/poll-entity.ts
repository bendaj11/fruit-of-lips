import { differenceBy, differenceWith, pick, sortedUniqBy } from 'lodash';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BaseEntity, EntityUpdate, ID } from '../models/base-entity.model';

const defaultComparator = <ID_TYPE = ID>(
  a: BaseEntity<ID_TYPE>,
  b: BaseEntity<ID_TYPE>
) => a.id === b.id && a.updatedAt === b.updatedAt;

const defaultDiff = <IDType>(
  prev: BaseEntity<IDType>[],
  current: BaseEntity<IDType>[]
): EntityUpdate<IDType, IDType> => {
  const deleted = differenceBy(prev, current, 'id').map(({ id }) => id);
  const upserted = differenceWith(current, prev, defaultComparator).map(
    ({ id }) => id
  );

  return { deleted, upserted };
};

export type PollEntityKind = 'rle' | 'child';

export interface BasePollOptions<Entity, IDType> {
  discriminator: PollEntityKind;
  myStore: () => Observable<BaseEntity<IDType>[]>;
  byIds: (ids: IDType[]) => Observable<Entity[]>;
  upsert: (entities: Entity[]) => void;
  remove: (ids: IDType[]) => void;
  diff?: (
    prev: BaseEntity<IDType>[],
    current: BaseEntity<IDType>[]
  ) => EntityUpdate<IDType, IDType>;
  debug?: boolean;
  entityName?: string;
}

export interface PollChildOptions<Entity, IDType>
  extends BasePollOptions<Entity, IDType> {
  discriminator: 'child';
  livequery: (id: IDType[]) => Observable<BaseEntity<IDType>[]>;
  fatherStore: () => Observable<IDType[]>;
}

export interface PollRleOptions<Entity, IDType>
  extends BasePollOptions<Entity, IDType> {
  discriminator: 'rle';
  livequery: () => Observable<BaseEntity<IDType>[]>;
}

export type PollOptions<Entity, IDType> =
  | PollRleOptions<Entity, IDType>
  | PollChildOptions<Entity, IDType>;

export const pollEntity = <Entity, IDType>(
  options: PollOptions<Entity, IDType>
) => {
  const {
    livequery,
    myStore,
    byIds,
    upsert,
    remove,
    debug = false,
    diff = defaultDiff,
    entityName = '',
  } = options;

  const handleEntity = () => (source: Observable<BaseEntity<IDType>[]>) =>
    source.pipe(
      tap((data) => log(data, entityName, 'livequery', debug)),
      withLatestFrom(myStore()),
      tap((data) => log(data, entityName, 'withLatestFromMyStore', debug)),
      map(([current, prev]) => diff(prev, current)),
      tap((data) => log(data, entityName, 'diff', debug)),
      tap(({ deleted, upserted }) => remove(deleted)),
      tap(({ deleted, upserted }) => log(deleted, entityName, 'remove', debug)),
      concatMap(({ deleted, upserted }) => byIds(upserted)),
      tap((data) => log(data, entityName, 'byIds', debug)),
      tap((entities) => upsert(entities))
    );

  if (options.discriminator === 'child') {
    return options.fatherStore().pipe(
      tap((data) => log(data, entityName, 'father', debug)),
      switchMap((ids) => livequery(ids).pipe(handleEntity()))
    );
  }

  return options.livequery().pipe(handleEntity());
};

export const sortedUniqByIdAndUpdatedAt = <Entity extends BaseEntity>(
  entities: Entity[]
) =>
  sortedUniqBy(
    entities.map((entity) => pick(entity, ['id', 'updatedAt'])),
    (entity) => entity.id
  );

const log = (
  data: any,
  entityName: string,
  operation: string,
  debug: boolean
) => {
  if (debug) {
    console.log(
      `pollEntity ${entityName}-${operation} ${JSON.stringify(data, null, 4)}`
    );
  }
};
function sort() {
  throw new Error('Function not implemented.');
}
