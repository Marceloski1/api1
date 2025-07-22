/*import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { info } from 'console';
import { Request } from 'express';

const tenant = new Map<string, ContextId>();
export class AgregateByTenantContextIdStrategy implements ContextIdStrategy {
  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver | undefined {
    const tenantId = request.headers['x-tenant-id'] as string;

    let tenantSubTreeId: ContextId;

    if (tenant.has(tenantId)) {
      tenantSubTreeId = tenant.get(tenantId);
    } else {
      tenantSubTreeId = ContextIdFactory.create();
      tenant.set(tenantId, tenantSubTreeId);
    }

    //If tree is not durable, return the original 'contextId' object
    return (info: HostComponentInfo) =>
      info.isTreeDurable ? tenantSubTreeId : contextId;
  }
}
*/
