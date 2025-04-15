import { Config, configSchema } from 'src/schemas/config.schema';

export function validate(raw: Record<string, unknown>) {
  const env: Config = {
    server: {
      nodeEnv: raw.NODE_ENV as string,
      port: parseInt((raw.PORT as string) || '3000'),
    },
    openai: {
      api_key: raw.OPENAI_API_KEY as string,
      system_message: {
        today: raw.OPENAI_SYSTEM_MESSAGE_TODAY as string,
        romance: raw.OPENAI_SYSTEM_MESSAGE_ROMANCE as string,
        monthly_study: raw.OPENAI_SYSTEM_MESSAGE_MONTHLY_STUDY as string,
      },
    },
    auth: {
      gatewayJwtHeader: raw.GATEWAY_JWT_HEADER as string,
      gatewayJwtSecret: raw.GATEWAY_JWT_SECRET as string,
    },
  };

  const parsedEnv = configSchema.parse(env);
  return parsedEnv;
}
