import { Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../interceptors/login.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
///import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { CacheInterceptor } from '../interceptors/cache.interceptor';

export const globalInterceptor: Provider[] = [];
