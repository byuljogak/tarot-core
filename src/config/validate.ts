import { Config, configSchema } from 'src/schemas/config.schema';

const parseIntIfExists = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? undefined : parsedValue;
};

export function validate(raw: Record<string, unknown>) {
  const env: Config = {
    server: {
      nodeEnv: raw.NODE_ENV as string,
      port: parseIntIfExists(raw.PORT as string) as number,
    },
    eventBus: {
      client: {
        clientId: raw.EVENT_BUS_CLIENT_ID as string,
        brokers: ((raw.EVENT_BUS_BROKERS as string | undefined) ?? '').split(
          ',',
        ),
      },
      consumer: {
        groupId: raw.EVENT_BUS_GROUP_ID as string,
      },
      dlt: {
        retry: {
          maxAttempts: parseIntIfExists(
            raw.EVENT_BUS_DLT_RETRY_MAX_ATTEMPTS as string,
          ) as number,
          delay: parseIntIfExists(
            raw.EVENT_BUS_DLT_RETRY_DELAY as string,
          ) as number,
        },
      },
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
      gatewayJwtHeader: raw.AUTH_GATEWAY_JWT_HEADER as string,
      gatewayJwtSecret: raw.AUTH_GATEWAY_JWT_SECRET as string,
    },
  };

  const parsedEnv = configSchema.parse(env);
  return parsedEnv;
}
