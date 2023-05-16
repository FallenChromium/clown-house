/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CityEvent } from '../models/CityEvent';
import type { CityEventModel } from '../models/CityEventModel';
import type { CityEventReadModel } from '../models/CityEventReadModel';
import type { CityEventType } from '../models/CityEventType';
import type { CityObject } from '../models/CityObject';
import type { CityObjectModel } from '../models/CityObjectModel';
import type { CityObjectOwner } from '../models/CityObjectOwner';
import type { CityObjectOwnerReadModel } from '../models/CityObjectOwnerReadModel';
import type { CityObjectReadModel } from '../models/CityObjectReadModel';
import type { CityObjectStats } from '../models/CityObjectStats';
import type { CityObjectStatsReadModel } from '../models/CityObjectStatsReadModel';
import type { CityObjectType } from '../models/CityObjectType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Read Object
     * @param itemId
     * @param q
     * @returns CityObject Successful Response
     * @throws ApiError
     */
    public static readObjectObjectsItemIdGet(
        itemId: number,
        q?: string,
    ): CancelablePromise<CityObject> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/objects/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteObjectObjectsItemIdDelete(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/objects/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Object
     * @param itemId
     * @param requestBody
     * @param q
     * @returns CityObjectModel Successful Response
     * @throws ApiError
     */
    public static updateObjectObjectsItemIdPatch(
        itemId: number,
        requestBody: CityObject,
        q?: string,
    ): CancelablePromise<CityObjectModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/objects/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects Raw
     * @param q
     * @returns CityObject Successful Response
     * @throws ApiError
     */
    public static readObjectsRawObjectsRawGet(
        q?: string,
    ): CancelablePromise<Array<CityObject>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/objects_raw',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects
     * @param activeOn
     * @param objectType
     * @returns CityObjectReadModel Successful Response
     * @throws ApiError
     */
    public static readObjectsObjectsGet(
        activeOn?: string,
        objectType?: number,
    ): CancelablePromise<Array<CityObjectReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/objects',
            query: {
                'active_on': activeOn,
                'object_type': objectType,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Object
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createObjectObjectsPost(
        requestBody: CityObject,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/objects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readObjectObjectTypesItemIdGet(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_types/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteObjectObjectTypesItemIdDelete(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/object_types/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Object
     * @param itemId
     * @param requestBody
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateObjectObjectTypesItemIdPatch(
        itemId: number,
        requestBody: CityObjectType,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/object_types/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readObjectsObjectTypesGet(
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_types',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Object
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createObjectObjectTypesPost(
        requestBody: CityObjectType,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/object_types',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Object
     * @param itemId
     * @param q
     * @returns CityObjectOwner Successful Response
     * @throws ApiError
     */
    public static readObjectObjectOwnersItemIdGet(
        itemId: number,
        q?: string,
    ): CancelablePromise<CityObjectOwner> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_owners/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteObjectObjectOwnersItemIdDelete(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/object_owners/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Object
     * @param itemId
     * @param requestBody
     * @param q
     * @returns CityObjectOwner Successful Response
     * @throws ApiError
     */
    public static updateObjectObjectOwnersItemIdPatch(
        itemId: number,
        requestBody: CityObjectOwner,
        q?: string,
    ): CancelablePromise<CityObjectOwner> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/object_owners/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects Raw
     * @param q
     * @returns CityObjectOwner Successful Response
     * @throws ApiError
     */
    public static readObjectsRawObjectOwnersRawGet(
        q?: string,
    ): CancelablePromise<Array<CityObjectOwner>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_owners_raw',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects
     * @param q
     * @returns CityObjectOwnerReadModel Successful Response
     * @throws ApiError
     */
    public static readObjectsObjectOwnersGet(
        q?: string,
    ): CancelablePromise<Array<CityObjectOwnerReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_owners',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Object
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createObjectObjectOwnersPost(
        requestBody: CityObjectOwner,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/object_owners',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Object
     * @param itemId
     * @param q
     * @returns CityObjectStats Successful Response
     * @throws ApiError
     */
    public static readObjectObjectStatsItemIdGet(
        itemId: number,
        q?: string,
    ): CancelablePromise<CityObjectStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_stats/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteObjectObjectStatsItemIdDelete(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/object_stats/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Object
     * @param itemId
     * @param requestBody
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateObjectObjectStatsItemIdPatch(
        itemId: number,
        requestBody: CityObjectStats,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/object_stats/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects Raw
     * @param q
     * @returns CityObjectStats Successful Response
     * @throws ApiError
     */
    public static readObjectsRawObjectStatsRawGet(
        q?: string,
    ): CancelablePromise<Array<CityObjectStats>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_stats_raw',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects
     * @param q
     * @returns CityObjectStatsReadModel Successful Response
     * @throws ApiError
     */
    public static readObjectsObjectStatsGet(
        q?: string,
    ): CancelablePromise<Array<CityObjectStatsReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object_stats',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Object
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createObjectObjectStatsPost(
        requestBody: CityObjectStats,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/object_stats',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Object
     * @param itemId
     * @param q
     * @returns CityEventModel Successful Response
     * @throws ApiError
     */
    public static readObjectEventsItemIdGet(
        itemId: number,
        q?: string,
    ): CancelablePromise<CityEventModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteObjectEventsItemIdDelete(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Object
     * @param itemId
     * @param requestBody
     * @param q
     * @returns CityEventModel Successful Response
     * @throws ApiError
     */
    public static updateObjectEventsItemIdPatch(
        itemId: number,
        requestBody: CityEvent,
        q?: string,
    ): CancelablePromise<CityEventModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/events/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects
     * @param eventsSince
     * @param eventsTill
     * @returns CityEventReadModel Successful Response
     * @throws ApiError
     */
    public static readObjectsEventsGet(
        eventsSince?: string,
        eventsTill?: string,
    ): CancelablePromise<Array<CityEventReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
            query: {
                'events_since': eventsSince,
                'events_till': eventsTill,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Object
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createObjectEventsPost(
        requestBody: CityEvent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects Raw
     * @param q
     * @returns CityEventModel Successful Response
     * @throws ApiError
     */
    public static readObjectsRawEventsRawGet(
        q?: string,
    ): CancelablePromise<Array<CityEventModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events_raw',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readObjectEventTypesItemIdGet(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/event_types/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Object
     * @param itemId
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteObjectEventTypesItemIdDelete(
        itemId: number,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/event_types/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Object
     * @param itemId
     * @param requestBody
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateObjectEventTypesItemIdPatch(
        itemId: number,
        requestBody: CityEventType,
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/event_types/{item_id}',
            path: {
                'item_id': itemId,
            },
            query: {
                'q': q,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Objects
     * @param q
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readObjectsEventTypesGet(
        q?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/event_types',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Object
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createObjectEventTypesPost(
        requestBody: CityEventType,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/event_types',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
