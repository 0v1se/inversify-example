import { Container } from 'inversify';

type Initializer = (Container) => Promise<void>;
const initializers: Initializer[] = [];
export function init(initializer: Initializer): void {
  initializers.push(initializer)
}
export async function initialize(container: Container): Promise<Container> {
  for (const initializer of initializers) {
    await initializer(container);
  }
  return container;
}
