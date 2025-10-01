import { cssVar } from '@toeverything/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  background: cssVar('backgroundPrimaryColor'),
  padding: '2rem',
});

export const header = style({
  textAlign: 'center',
  marginBottom: '3rem',
});

export const title = style({
  fontSize: '3rem',
  fontWeight: '700',
  margin: 0,
  color: cssVar('textPrimaryColor'),
  marginBottom: '0.5rem',
});

export const subtitle = style({
  fontSize: '1.2rem',
  color: cssVar('textSecondaryColor'),
  margin: 0,
});

export const content = style({
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const createSection = style({
  display: 'flex',
  justifyContent: 'center',
});

export const createButton = style({
  minWidth: '200px',
});

export const createForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '400px',
});

export const createInput = style({
  fontSize: '1.1rem',
  padding: '0.8rem',
});

export const createActions = style({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
});

export const workspacesList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const listTitle = style({
  fontSize: '1.5rem',
  fontWeight: '600',
  color: cssVar('textPrimaryColor'),
  margin: 0,
  textAlign: 'center',
});

export const workspaceGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1rem',
  padding: '1rem 0',
});

export const workspaceCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.5rem',
  background: cssVar('backgroundSecondaryColor'),
  borderRadius: '8px',
  border: `1px solid ${cssVar('borderColor')}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  
  ':hover': {
    background: cssVar('hoverColor'),
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
});

export const workspaceIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  background: cssVar('primaryColor'),
  color: 'white',
  fontSize: '24px',
});

export const workspaceInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  flex: 1,
});

export const workspaceName = style({
  fontSize: '1.1rem',
  fontWeight: '600',
  color: cssVar('textPrimaryColor'),
  margin: 0,
});

export const workspaceDate = style({
  fontSize: '0.9rem',
  color: cssVar('textSecondaryColor'),
  margin: 0,
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '3rem',
  textAlign: 'center',
});

export const emptyIcon = style({
  fontSize: '4rem',
  color: cssVar('iconSecondary'),
});

export const emptyText = style({
  fontSize: '1.1rem',
  color: cssVar('textSecondaryColor'),
  margin: 0,
  maxWidth: '400px',
});