type CloneablePrimitive = string | number | boolean | bigint | symbol | null | undefined;
type CloneableObject = object & { constructor?: unknown };
type Cloneable<T> = T extends CloneablePrimitive ? T : T extends CloneableObject ? T : never;

export function deepClone<T>(obj: Cloneable<T>, hash: WeakMap<object, Cloneable<T>> = new WeakMap()): Cloneable<T> {
    // 处理基本类型和函数（通过泛型约束保证）
    if (typeof obj !== 'object' || obj === null || obj instanceof Function) {
        return obj;
    }

    // 处理循环引用（使用精确类型断言）
    if (hash.has(obj)) {
        return hash.get(obj)!;
    }

    // 特殊对象处理（使用类型收窄）
    let result: Cloneable<T>;
    if (obj instanceof Date) {
        result = new Date(obj) as Cloneable<T>;
    } else if (obj instanceof RegExp) {
        result = new RegExp(obj.source, obj.flags) as Cloneable<T>;
    } else if (Array.isArray(obj)) {
        result = [] as unknown as Cloneable<T>;
    } else if (obj.constructor && obj.constructor !== Object) {
        result = new (obj.constructor as new () => Cloneable<T>)();
    } else {
        result = Object.create(null) as Cloneable<T>;
    }

    hash.set(obj, result);

    // 使用类型断言处理属性拷贝
    const source = obj as Record<PropertyKey, unknown>;
    const target = result as Record<PropertyKey, unknown>;

    for (const key of Reflect.ownKeys(source)) {
        const descriptor = Object.getOwnPropertyDescriptor(source, key)!;
        if (descriptor.get || descriptor.set) {
            Object.defineProperty(target, key, descriptor);
        } else {
            target[key] = deepClone(descriptor.value as Cloneable<typeof descriptor.value>, hash);
        }
    }

    return result;
}