import { useRouter } from "next/router";
import {
  ListSubheader,
  alpha,
  Box,
  Divider,
  List,
  styled,
  useTheme,
  Button,
  ListItem,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useSidebarContext } from "src/contexts/SidebarContext";
import { useAuthContext } from "src/contexts/AuthContext";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import ThemeUpdater from "src/theme/ThemeUpdater";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import ProductFilter from "../productFilter";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;        
    
        .MuiButton-root {
          border: 1px solid;
          border-color: transparent;
          display: flex;
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }

          &.active,
          &:hover {
            border: 1px solid;
            
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border: "10px solid";

                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const theme = useTheme();
  const router = useRouter();
  const currentRoute = router.pathname;
  const { closeSidebar } = useSidebarContext();
  const { user, logout } = useAuthContext();

  const logOutHandler = () => {
    closeSidebar();
    logout();
  };
  return (
    <>
      <MenuWrapper>
        {currentRoute === "/products/[catId]" ? <ProductFilter /> : ""}

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Dashboard
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/" passHref style={{ textDecoration: "none" }}>
                  <Button
                                        sx={{ minWidth: "200px" }}
                    className={currentRoute === "/" ? "active" : ""}
                    onClick={closeSidebar}
                    startIcon={<GridViewTwoToneIcon />}
                  >
                    Categories
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink 
                  href="/cart"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{ minWidth: "200px" }}
                    className={currentRoute === "/cart" ? "active" : ""}
                    onClick={closeSidebar}
                    startIcon={<ShoppingCartTwoToneIcon />}
                  >
                    Cart
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Accounts
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/auth/login" style={{ textDecoration: "none" }} passHref>
                  {user ? (
                    <Button
                    sx={{ minWidth: "200px" }}
                      onClick={logOutHandler}
                      startIcon={<LockOpenTwoToneIcon />}
                    >
                      Log Out
                    </Button>
                  ) : (
                    <Button
                    sx={{ minWidth: "200px" }}

                      className={currentRoute === "/auth/login" ? "active" : ""}
                      onClick={closeSidebar}
                      startIcon={<AccountCircleTwoToneIcon />}
                    >
                      Sigh In
                    </Button>
                  )}
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Extra Pages
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/about" style={{ textDecoration: "none" }} passHref>
                  <Button
                    sx={{ minWidth: "200px" }}
                    className={currentRoute === "/about" ? "active" : ""}
                    onClick={closeSidebar}
                    startIcon={<WorkspacePremiumTwoToneIcon />}
                  >
                    <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                      About
                    </Typography>
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>

          <Divider
            sx={{
              m: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <ThemeUpdater />
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
