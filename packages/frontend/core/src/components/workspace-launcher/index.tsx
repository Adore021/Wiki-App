/**
 * Workspace Launcher for offline-first mode
 * Replaces the login page with a local workspace selector
 */
import { Button, Input } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { PlusIcon, WorkspaceIcon } from '@blocksuite/icons/rc';
import { useCallback, useEffect, useState } from 'react';

import { LocalStorageProvider } from '../../lib/local-storage';
import * as styles from './styles.css';

interface WorkspaceData {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  flavor: string;
}

interface WorkspaceLauncherProps {
  onSelectWorkspace?: (workspaceId: string) => void;
  onCreateWorkspace?: (workspace: WorkspaceData) => void;
}

export const WorkspaceLauncher = ({
  onSelectWorkspace,
  onCreateWorkspace,
}: WorkspaceLauncherProps) => {
  const t = useI18n();
  const [workspaces, setWorkspaces] = useState<WorkspaceData[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [storageProvider] = useState(() => new LocalStorageProvider());

  // Load workspaces on mount
  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const workspaceList = await storageProvider.getWorkspaceList();
      setWorkspaces(workspaceList);
    } catch (error) {
      console.error('Failed to load workspaces:', error);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) return;

    try {
      const workspace = await storageProvider.createWorkspace(newWorkspaceName.trim());
      setWorkspaces(prev => [workspace, ...prev]);
      setNewWorkspaceName('');
      setIsCreating(false);
      onCreateWorkspace?.(workspace);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  const handleSelectWorkspace = useCallback(
    (workspaceId: string) => {
      onSelectWorkspace?.(workspaceId);
    },
    [onSelectWorkspace]
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AFFiNE</h1>
        <p className={styles.subtitle}>Your Local Knowledge Base</p>
      </div>

      <div className={styles.content}>
        {/* Create New Workspace Section */}
        <div className={styles.createSection}>
          {!isCreating ? (
            <Button
              onClick={() => setIsCreating(true)}
              size="extraLarge"
              prefix={<PlusIcon />}
              className={styles.createButton}
            >
              Create New Workspace
            </Button>
          ) : (
            <div className={styles.createForm}>
              <Input
                placeholder="Enter workspace name..."
                value={newWorkspaceName}
                onChange={setNewWorkspaceName}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleCreateWorkspace();
                  } else if (e.key === 'Escape') {
                    setIsCreating(false);
                    setNewWorkspaceName('');
                  }
                }}
                autoFocus
                className={styles.createInput}
              />
              <div className={styles.createActions}>
                <Button
                  onClick={handleCreateWorkspace}
                  disabled={!newWorkspaceName.trim()}
                  size="large"
                >
                  Create
                </Button>
                <Button
                  onClick={() => {
                    setIsCreating(false);
                    setNewWorkspaceName('');
                  }}
                  variant="plain"
                  size="large"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Workspaces List */}
        <div className={styles.workspacesList}>
          {workspaces.length === 0 ? (
            <div className={styles.emptyState}>
              <WorkspaceIcon className={styles.emptyIcon} />
              <p className={styles.emptyText}>
                No workspaces yet. Create your first workspace to get started.
              </p>
            </div>
          ) : (
            <>
              <h2 className={styles.listTitle}>Your Workspaces</h2>
              <div className={styles.workspaceGrid}>
                {workspaces.map(workspace => (
                  <div
                    key={workspace.id}
                    className={styles.workspaceCard}
                    onClick={() => handleSelectWorkspace(workspace.id)}
                  >
                    <div className={styles.workspaceIcon}>
                      <WorkspaceIcon />
                    </div>
                    <div className={styles.workspaceInfo}>
                      <h3 className={styles.workspaceName}>{workspace.name}</h3>
                      <p className={styles.workspaceDate}>
                        Last modified: {formatDate(workspace.updatedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};