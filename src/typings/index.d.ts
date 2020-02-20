// Type definitions for Stencil Utils v4.1.0
// Project: https://github.com/bigcommerce/stencil-utils
// Definitions by: Arctic Leaf <https://github.com/arcticleaf>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Documentation: https://developer.bigcommerce.com/stencil-docs/adding-event-hooks-to-your-theme/stencil-utils-api-reference

import Api from './api';
import Hooks from './hooks';
import Tools from './tools';

interface StencilUtils {
    api: Api;
    hooks: Hooks;
    tools: Tools;
}

declare const utils: StencilUtils;

export const api: Api;
export const hooks: Hooks;
export const tools: Tools;
export default utils;
