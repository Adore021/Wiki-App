/**
 * Offline-only NBStore provider that disables all sync capabilities
 * This provides local storage only without any remote sync
 */
import { LiveData } from '@toeverything/infra';

// Mock implementations for offline-first mode
class OfflineAwarenessFrontend {
  connectAwareness() {
    // Return a no-op function - no awareness sync in offline mode
    return () => {};
  }
}

class OfflineDocFrontend {
  connectDoc() {
    // Return a no-op function - docs are managed locally only
    return () => {};
  }

  addPriority() {
    // No-op for offline mode
  }

  start() {
    // No-op for offline mode
  }

  stop() {
    // No-op for offline mode
  }
}

class OfflineBlobFrontend {
  blobState$() {
    // Return a LiveData that indicates the blob is ready (for offline mode)
    return new LiveData('ready');
  }

  upload() {
    // No-op for offline mode
    return Promise.resolve();
  }

  fullDownload() {
    // No-op for offline mode
    return Promise.resolve();
  }
}

class OfflineIndexerFrontend {
  addPriority() {
    // No-op for offline mode
  }
}

// Mock store client for offline mode
export class OfflineStoreClient {
  docFrontend = new OfflineDocFrontend();
  blobFrontend = new OfflineBlobFrontend();
  indexerFrontend = new OfflineIndexerFrontend();
  awarenessFrontend = new OfflineAwarenessFrontend();

  async enableBatterySaveMode() {
    // No-op for offline mode
    return Promise.resolve();
  }
}

export class OfflineNbstoreProvider {
  openStore() {
    const store = new OfflineStoreClient();
    const dispose = () => {
      // No cleanup needed for offline mode
    };

    return {
      store,
      dispose,
    };
  }
}