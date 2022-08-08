interface Message {
  [key: string]: string;
}

export const message: Message = {
  successful: 'successful',
  unsuccessful: 'unsuccessful',
  url_not_found: 'url_not_found',
  undefined_error: 'undefined_error',
  unexpected_error: 'unexpected_error',
  unexpected_server_error: 'unexpected_server_error',
  no_authorization: 'no_authorization',
  has_authorization: 'has_authorization',
  invalid_authorization: 'invalid_authorization',
  unexpected_authorization_error: 'unexpected_authorization_error',
  no_app_secret: 'no_app_secret',
  invalid_app_secret: 'invalid_app_secret',
  unexpected_app_secret_error: 'unexpected_app_secret_error',
  notify_success: 'notify_success',
  notify_failed: 'notify_failed',
};

export function getMessage(key: string): string {
  return message[key] ?? message['undefined_error'];
}
