export enum Messages {
    DUPLICATE_USER = 'User with same email or username already exists.',
    USER_REGISTRATION_SUCCESSFUL = 'Users registered successfully and verification email has been sent on your email.',
    MONGO_CONNECTION_SUCCESSFUL = '\n☘️  MongoDB Connected! Db host: ',
    MONGO_CONNECTION_ERROR = 'MongoDB connection error: ',
    MONGO_CONNECTION_STRING_MISSING = 'MongoDB connection string is missing.',
    COMMON_ERROR_MESSAGE = 'Something went wrong!',
    WSS_CONNECTION_ERROR = 'WS Server Connection Error: ',
    HTTP_SERVER_CONNECTION_SUCCESSFUL = '⚙️  HTTP Server Listening on port ',
    SUCCESS = 'Success!',
    EMAIL_REQUIRED = 'Email is Required.',
    EMAIL_INVALID = 'Email is Invalid.',
    PASSWORD_REQUIRED = 'Password is Required.',
    USERNAME_REQUIRED = 'Username is Required.',
    USERNAME_LENGTH = 'Username must be at least 3 characters long.',
    USERNAME_LOWERCASE = 'Username must be lowercase.',
    INVALID_DATA = 'Received data is Invalid.'
}
