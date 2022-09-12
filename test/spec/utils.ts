

export function should_throw(fn: Function, message?: string) {
  try {
    fn();
  } catch (e: any) { return; }

  throw new Error(message ?? "Should have thrown an error.")
}