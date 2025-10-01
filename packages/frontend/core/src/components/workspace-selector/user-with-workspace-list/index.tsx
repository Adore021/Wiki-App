import { ScrollableContainer } from '@affine/component';
import { MenuItem } from '@affine/component/ui/menu';
import { AuthService, DefaultServerService } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
import { ServerFeature } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { Logo1Icon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';

import { AddWorkspace } from './add-workspace';
import * as styles from './index.css';
import { AFFiNEWorkspaceList } from './workspace-list';

// SignInItem disabled for offline-first mode
export const SignInItem = () => {
  return null;
};

interface UserWithWorkspaceListProps {
  onEventEnd?: () => void;
  onClickWorkspace?: (workspace: WorkspaceMetadata) => void;
  onCreatedWorkspace?: (payload: {
    metadata: WorkspaceMetadata;
    defaultDocId?: string;
  }) => void;
  showEnableCloudButton?: boolean;
}

export const UserWithWorkspaceList = ({
  onEventEnd,
  onClickWorkspace,
  onCreatedWorkspace,
  showEnableCloudButton,
}: UserWithWorkspaceListProps) => {
  const globalDialogService = useService(GlobalDialogService);
  const session = useLiveData(useService(AuthService).session.session$);
  const defaultServerService = useService(DefaultServerService);

  const isAuthenticated = session.status === 'authenticated';

  const openSignInModal = useCallback(() => {
    globalDialogService.open('sign-in', {});
  }, [globalDialogService]);

  const onNewWorkspace = useCallback(() => {
    // In offline-first mode, always allow creating workspaces
    track.$.navigationPanel.workspaceList.createWorkspace();
    globalDialogService.open('create-workspace', {}, payload => {
      if (payload) {
        onCreatedWorkspace?.(payload);
      }
    });
    onEventEnd?.();
  }, [
    globalDialogService,
    onCreatedWorkspace,
    onEventEnd,
  ]);

  const onAddWorkspace = useCallback(() => {
    track.$.navigationPanel.workspaceList.createWorkspace({
      control: 'import',
    });
    globalDialogService.open('import-workspace', undefined, payload => {
      if (payload) {
        onCreatedWorkspace?.({ metadata: payload.workspace });
      }
    });
    onEventEnd?.();
  }, [globalDialogService, onCreatedWorkspace, onEventEnd]);

  return (
    <>
      <ScrollableContainer
        className={styles.workspaceScrollArea}
        viewPortClassName={styles.workspaceScrollAreaViewport}
        scrollBarClassName={styles.scrollbar}
        scrollThumbClassName={styles.scrollbarThumb}
      >
        <AFFiNEWorkspaceList
          onEventEnd={onEventEnd}
          onClickWorkspace={onClickWorkspace}
          showEnableCloudButton={showEnableCloudButton}
        />
      </ScrollableContainer>
      <div className={styles.workspaceFooter}>
        <AddWorkspace
          onAddWorkspace={onAddWorkspace}
          onNewWorkspace={onNewWorkspace}
        />
      </div>
    </>
  );
};
