import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { SectionCardContainer } from 'src/components/Cards/SectionCard/SectionCard.style';

export const PortfolioAssetsListContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const PortfolioAssetContainer = styled(SectionCardContainer)(
  ({ theme }) => ({
    padding: theme.spacing(3),
    boxShadow: theme.shadows[2],
  }),
);
