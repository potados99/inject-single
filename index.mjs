import Injector from './lib/Injector';

const injector = new Injector();

let isInitialized = false;

export default function resolve(type) {
  console.log(`Resolve '${type.name}'`);

  return injector.resolve(type);
}

export async function init(declaration, force = false, verbose = false) {
  if (!isInitialized || force) {
    await injector.init(declaration, verbose);

    console.log('Injector initialized.');
    isInitialized = true;
  } else {
    console.log('Ignore init.');
  }
}

export async function initWithOverrides(declaration, override, force = false, verbose = false) {
  const declarations = _toArrayIfNot(declaration);
  const overrides = _toArrayIfNot(override);

  const finalDeclaration = declarations.map((decl) => {
    const overrideFound = overrides.find((ov) => ov.as === decl.as);

    if (overrideFound) {
      return {
        create: overrideFound.create,
        as: overrideFound.as,
      };
    } else {
      return decl;
    }
  });

  await init(finalDeclaration, force, verbose);
}

function _toArrayIfNot(object) {
  if (Array.isArray(object)) {
    return object;
  } else {
    return [object];
  }
}

export function mockPersist(classType, instance) {
  injector.mock(classType, instance);
}

export function mockOnce(classType, instance) {
  injector.mockOnce(classType, instance);
}

export function mockClear(classType) {
  injector.mockClear(classType);
}
