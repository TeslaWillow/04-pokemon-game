import { createApp, type App } from 'vue';

export const withSetup = (composable: () => any): readonly [any, App<Element>] => {
  let result: any;

  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    },
  });
  app.mount(document.createElement('div'));
  return [result, app] as const;
};
