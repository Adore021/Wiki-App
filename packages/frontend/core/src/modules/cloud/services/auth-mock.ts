/**
 * Mock AuthService and related components for offline-first mode
 * This service simulates an always-authenticated user without making any network requests
 */
import { Entity, LiveData, Store, Service } from '@toeverything/infra';
import { BehaviorSubject } from 'rxjs';

import type { AuthSessionInfo, AuthAccountInfo } from '../entities/session';

// Mock AuthStore for offline mode
export class AuthStoreMock extends Store {
  private mockSession: AuthSessionInfo = {
    account: {
      id: 'local-user',
      label: 'Local User',
      email: 'local@localhost',
      avatar: null,
      info: {
        id: 'local-user',
        email: 'local@localhost',
        name: 'Local User',
        hasPassword: false,
        avatarUrl: null,
        emailVerified: null,
      },
    },
  };

  watchCachedAuthSession() {
    return new BehaviorSubject(this.mockSession);
  }

  getCachedAuthSession() {
    return this.mockSession;
  }

  setCachedAuthSession(session: AuthSessionInfo | null) {
    // No-op for mock
  }

  async fetchSession() {
    return {
      user: {
        id: 'local-user',
        email: 'local@localhost',
        name: 'Local User',
        hasPassword: false,
        avatarUrl: null,
        emailVerified: null,
      },
    };
  }

  async signInMagicLink() {
    return Promise.resolve();
  }

  async signInOauth() {
    return Promise.resolve({ redirectUri: '/' });
  }

  async signInPassword() {
    return Promise.resolve();
  }

  async signOut() {
    return Promise.resolve();
  }

  async deleteAccount() {
    return Promise.resolve();
  }

  async checkUserByEmail() {
    return Promise.resolve({ hasPassword: false });
  }

  async removeAvatar() {
    return Promise.resolve();
  }

  async uploadAvatar() {
    return Promise.resolve();
  }

  async updateLabel() {
    return Promise.resolve();
  }

  setClientNonce() {
    // No-op for mock
  }

  getClientNonce() {
    return 'mock-nonce';
  }
}

// Mock AuthSession for offline mode
export class AuthSessionMock extends Entity {
  session$ = new LiveData({
    status: 'authenticated' as const,
    session: {
      account: {
        id: 'local-user',
        label: 'Local User',
        email: 'local@localhost',
        avatar: null,
        info: {
          id: 'local-user',
          email: 'local@localhost',
          name: 'Local User',
          hasPassword: false,
          avatarUrl: null,
          emailVerified: null,
        },
      },
    },
  });

  status$ = new LiveData('authenticated' as const);

  account$ = new LiveData({
    id: 'local-user',
    label: 'Local User',
    email: 'local@localhost',
    avatar: null,
    info: {
      id: 'local-user',
      email: 'local@localhost',
      name: 'Local User',
      hasPassword: false,
      avatarUrl: null,
      emailVerified: null,
    },
  });

  isRevalidating$ = new LiveData(false);

  async waitForAuthenticated() {
    return {
      status: 'authenticated' as const,
      session: this.session$.value.session,
    };
  }

  revalidate = () => {
    // No-op for mock
  };

  async waitForRevalidation() {
    return Promise.resolve();
  }

  async removeAvatar() {
    return Promise.resolve();
  }

  async uploadAvatar() {
    return Promise.resolve();
  }

  async updateLabel() {
    return Promise.resolve();
  }
}

// Mock AuthService for offline mode
export class AuthServiceMock extends Service {
  session = this.framework.createEntity(AuthSessionMock);

  constructor() {
    super();
  }

  async sendEmailMagicLink() {
    return Promise.resolve();
  }

  async signInMagicLink() {
    return Promise.resolve();
  }

  async oauthPreflight() {
    return Promise.resolve({});
  }

  async signInOauth() {
    return Promise.resolve({ redirectUri: '/' });
  }

  async signInPassword() {
    return Promise.resolve();
  }

  async signOut() {
    return Promise.resolve();
  }

  async deleteAccount() {
    return Promise.resolve();
  }

  async checkUserByEmail() {
    return Promise.resolve({ hasPassword: false });
  }

  captchaHeaders() {
    return {};
  }
}