import { Divider, MenuItem } from '@affine/component';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';

import {
  ItemContainer,
  ItemText,
  prefixIcon,
} from '../add-workspace/index.css';
import { addServerDividerWrapper } from './index.css';

// AddServer component disabled for offline-first mode
export const AddServer = () => {
  return null;
};
