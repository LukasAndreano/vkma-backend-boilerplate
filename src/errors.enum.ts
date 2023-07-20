class Errors {
  static readonly ACCESS_DENIED = {
    errorCode: 0,
    message: 'access denied',
  };

  static readonly NOT_FOUND = {
    errorCode: 1,
    message: 'not found',
  };

  static readonly ALREADY_EXISTS = {
    errorCode: 2,
    message: 'already exists',
  };

  static readonly USER_NOT_FOUND = {
    errorCode: 3,
    message: 'user not found',
  };

  static readonly BAD_REQUEST = {
    errorCode: 4,
    message: 'bad request',
  };

  static readonly PHOTO_NOT_FOUND = {
    errorCode: 5,
    message: 'photo not found',
  };

  static readonly NOTIFICATIONS_DISABLED = {
    errorCode: 6,
    message: 'notifications disabled',
  };

  static readonly ONLY_IMAGES_ARE_ALLOWED = {
    errorCode: 7,
    message: 'only images are allowed',
  };
}

export default Errors;
