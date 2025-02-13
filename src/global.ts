declare global {
    interface PhylloConfig {
        // Add properties based on the actual config type
        clientDisplayName: string,
        environment: 'staging'|'prod'|'fake',
        userId: string,
        token: string,
        redirect: boolean,
        workPlatformId?: string,
        'redirect URL'?: string;
    }
    interface PhylloConnectInstance {
        initialize: (config: PhylloConfig) => PhylloConnectInstance;
        on: any,
        open: () => void
        // Add any other methods or properties that PhylloConnect has
    }

    const PhylloConnect: PhylloConnectInstance;
}

export {};