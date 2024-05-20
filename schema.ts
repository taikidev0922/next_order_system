/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/auth/logout/": {
    /**
     * @description Calls Django logout method and delete the Token object
     * assigned to the current User object.
     *
     * Accepts/Returns nothing.
     */
    get: operations["listLogouts"];
    /**
     * @description Calls Django logout method and delete the Token object
     * assigned to the current User object.
     *
     * Accepts/Returns nothing.
     */
    post: operations["createLogout"];
  };
  "/api/auth/user/": {
    /**
     * @description Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     */
    get: operations["retrieveUserDetails"];
    /**
     * @description Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     */
    put: operations["updateUserDetails"];
    /**
     * @description Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     */
    patch: operations["partialUpdateUserDetails"];
  };
  "/api/customers/": {
    get: operations["listCustomers"];
    post: operations["createCustomer"];
  };
  "/api/customers/{customer_id}/": {
    get: operations["retrieveCustomer"];
    put: operations["updateCustomer"];
    delete: operations["destroyCustomer"];
    patch: operations["partialUpdateCustomer"];
  };
  "/api/products/": {
    get: operations["listProducts"];
    post: operations["createProduct"];
  };
  "/api/products/{product_id}/": {
    get: operations["retrieveProduct"];
    put: operations["updateProduct"];
    delete: operations["destroyProduct"];
    patch: operations["partialUpdateProduct"];
  };
  "/api/orders/": {
    get: operations["listOrders"];
    post: operations["createOrder"];
  };
  "/api/orders/{order_id}/": {
    get: operations["retrieveOrder"];
    put: operations["updateOrder"];
    delete: operations["destroyOrder"];
    patch: operations["partialUpdateOrder"];
  };
  "/api/auth/password/reset/": {
    /**
     * @description Calls Django Auth PasswordResetForm save method.
     *
     * Accepts the following POST parameters: email
     * Returns the success/fail message.
     */
    post: operations["createPasswordReset"];
  };
  "/api/auth/password/reset/confirm/": {
    /**
     * @description Password reset e-mail link is confirmed, therefore
     * this resets the user's password.
     *
     * Accepts the following POST parameters: token, uid,
     *     new_password1, new_password2
     * Returns the success/fail message.
     */
    post: operations["createPasswordResetConfirm"];
  };
  "/api/auth/login/": {
    /**
     * @description Check the credentials and return the REST Token
     * if the credentials are valid and authenticated.
     * Calls Django Auth login method to register User ID
     * in Django session framework
     *
     * Accept the following POST parameters: username, password
     * Return the REST Framework Token Object's key.
     */
    post: operations["createLogin"];
  };
  "/api/auth/password/change/": {
    /**
     * @description Calls Django Auth SetPasswordForm save method.
     *
     * Accepts the following POST parameters: new_password1, new_password2
     * Returns the success/fail message.
     */
    post: operations["createPasswordChange"];
  };
  "/api/auth/token/verify/": {
    /**
     * @description Takes a token and indicates if it is valid.  This view provides no
     * information about a token's fitness for a particular use.
     */
    post: operations["createTokenVerify"];
  };
  "/api/auth/token/refresh/": {
    post: operations["createCookieTokenRefresh"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    UserDetails: {
      pk?: number;
      /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
      username: string;
      /** Format: email */
      email?: string;
      first_name?: string;
      last_name?: string;
    };
    Customer: {
      customer_id?: number;
      name: string;
      address: string;
      phone: string;
    };
    Product: {
      product_id?: number;
      name: string;
      description: string;
      /** Format: decimal */
      price: string;
    };
    Order: {
      order_id?: number;
      items: {
          order_item_id?: number;
          quantity: number;
          /** Format: decimal */
          price: string;
          order: number;
          product: number;
        }[];
      /** Format: date-time */
      order_date?: string;
      customer: number;
    };
    PasswordReset: {
      /** Format: email */
      email: string;
    };
    PasswordResetConfirm: {
      new_password1: string;
      new_password2: string;
      uid: string;
      token: string;
    };
    Login: {
      username?: string;
      /** Format: email */
      email?: string;
      password: string;
    };
    PasswordChange: {
      new_password1: string;
      new_password2: string;
    };
    TokenVerify: {
      token: string;
    };
    CookieTokenRefresh: {
      /** @description WIll override cookie. */
      refresh?: string;
      access?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * @description Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   */
  listLogouts: {
    responses: {
      200: {
        content: {
          "application/json": unknown[];
        };
      };
    };
  };
  /**
   * @description Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   */
  createLogout: {
    requestBody?: {
      content: {
        "application/json": unknown;
        "application/x-www-form-urlencoded": unknown;
        "multipart/form-data": unknown;
      };
    };
    responses: {
      201: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /**
   * @description Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   */
  retrieveUserDetails: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserDetails"];
        };
      };
    };
  };
  /**
   * @description Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   */
  updateUserDetails: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UserDetails"];
        "application/x-www-form-urlencoded": components["schemas"]["UserDetails"];
        "multipart/form-data": components["schemas"]["UserDetails"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserDetails"];
        };
      };
    };
  };
  /**
   * @description Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   */
  partialUpdateUserDetails: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UserDetails"];
        "application/x-www-form-urlencoded": components["schemas"]["UserDetails"];
        "multipart/form-data": components["schemas"]["UserDetails"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserDetails"];
        };
      };
    };
  };
  listCustomers: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Customer"][];
        };
      };
    };
  };
  createCustomer: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Customer"];
        "application/x-www-form-urlencoded": components["schemas"]["Customer"];
        "multipart/form-data": components["schemas"]["Customer"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Customer"];
        };
      };
    };
  };
  retrieveCustomer: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this customer. */
        customer_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Customer"];
        };
      };
    };
  };
  updateCustomer: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this customer. */
        customer_id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Customer"];
        "application/x-www-form-urlencoded": components["schemas"]["Customer"];
        "multipart/form-data": components["schemas"]["Customer"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Customer"];
        };
      };
    };
  };
  destroyCustomer: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this customer. */
        customer_id: string;
      };
    };
    responses: {
      204: {
        content: never;
      };
    };
  };
  partialUpdateCustomer: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this customer. */
        customer_id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Customer"];
        "application/x-www-form-urlencoded": components["schemas"]["Customer"];
        "multipart/form-data": components["schemas"]["Customer"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Customer"];
        };
      };
    };
  };
  listProducts: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Product"][];
        };
      };
    };
  };
  createProduct: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Product"];
        "application/x-www-form-urlencoded": components["schemas"]["Product"];
        "multipart/form-data": components["schemas"]["Product"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Product"];
        };
      };
    };
  };
  retrieveProduct: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this product. */
        product_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Product"];
        };
      };
    };
  };
  updateProduct: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this product. */
        product_id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Product"];
        "application/x-www-form-urlencoded": components["schemas"]["Product"];
        "multipart/form-data": components["schemas"]["Product"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Product"];
        };
      };
    };
  };
  destroyProduct: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this product. */
        product_id: string;
      };
    };
    responses: {
      204: {
        content: never;
      };
    };
  };
  partialUpdateProduct: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this product. */
        product_id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Product"];
        "application/x-www-form-urlencoded": components["schemas"]["Product"];
        "multipart/form-data": components["schemas"]["Product"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Product"];
        };
      };
    };
  };
  listOrders: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Order"][];
        };
      };
    };
  };
  createOrder: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Order"];
        "application/x-www-form-urlencoded": components["schemas"]["Order"];
        "multipart/form-data": components["schemas"]["Order"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Order"];
        };
      };
    };
  };
  retrieveOrder: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this order. */
        order_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Order"];
        };
      };
    };
  };
  updateOrder: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this order. */
        order_id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Order"];
        "application/x-www-form-urlencoded": components["schemas"]["Order"];
        "multipart/form-data": components["schemas"]["Order"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Order"];
        };
      };
    };
  };
  destroyOrder: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this order. */
        order_id: string;
      };
    };
    responses: {
      204: {
        content: never;
      };
    };
  };
  partialUpdateOrder: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this order. */
        order_id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Order"];
        "application/x-www-form-urlencoded": components["schemas"]["Order"];
        "multipart/form-data": components["schemas"]["Order"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Order"];
        };
      };
    };
  };
  /**
   * @description Calls Django Auth PasswordResetForm save method.
   *
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   */
  createPasswordReset: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PasswordReset"];
        "application/x-www-form-urlencoded": components["schemas"]["PasswordReset"];
        "multipart/form-data": components["schemas"]["PasswordReset"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["PasswordReset"];
        };
      };
    };
  };
  /**
   * @description Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   *
   * Accepts the following POST parameters: token, uid,
   *     new_password1, new_password2
   * Returns the success/fail message.
   */
  createPasswordResetConfirm: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PasswordResetConfirm"];
        "application/x-www-form-urlencoded": components["schemas"]["PasswordResetConfirm"];
        "multipart/form-data": components["schemas"]["PasswordResetConfirm"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["PasswordResetConfirm"];
        };
      };
    };
  };
  /**
   * @description Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   *
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   */
  createLogin: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Login"];
        "application/x-www-form-urlencoded": components["schemas"]["Login"];
        "multipart/form-data": components["schemas"]["Login"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Login"];
        };
      };
    };
  };
  /**
   * @description Calls Django Auth SetPasswordForm save method.
   *
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   */
  createPasswordChange: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PasswordChange"];
        "application/x-www-form-urlencoded": components["schemas"]["PasswordChange"];
        "multipart/form-data": components["schemas"]["PasswordChange"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["PasswordChange"];
        };
      };
    };
  };
  /**
   * @description Takes a token and indicates if it is valid.  This view provides no
   * information about a token's fitness for a particular use.
   */
  createTokenVerify: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["TokenVerify"];
        "application/x-www-form-urlencoded": components["schemas"]["TokenVerify"];
        "multipart/form-data": components["schemas"]["TokenVerify"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["TokenVerify"];
        };
      };
    };
  };
  createCookieTokenRefresh: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["CookieTokenRefresh"];
        "application/x-www-form-urlencoded": components["schemas"]["CookieTokenRefresh"];
        "multipart/form-data": components["schemas"]["CookieTokenRefresh"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CookieTokenRefresh"];
        };
      };
    };
  };
}