import { AccountDto } from "../../../common/contracts";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import {
  Edit,
  LockOutlined,
  MoreVert,
  ShoppingCartOutlined,
  Token,
  Wallet,
} from "@mui/icons-material";
import { UpdateAccountDialog } from "./UpdateAccountDialog";
import { CreatePaymentDialog } from "../transaction/CreatePaymentDialog";
import { AccountAuthenticationDialog } from "./AccountAuthenticationDialog";
import { AccountSessionDialog } from "./AccountSessionDialog";
import { useTranslation } from "react-i18next";
import { useDashboardSelector } from "../../redux/dashboardStore";

export const AccountDetailsActionButton = (props: {
  account: AccountDto;
  isOwn?: boolean;
  minimize?: boolean;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const token = useDashboardSelector((state) => state.userState.token);

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openSessionModal, setOpenSessionModal] = useState(false);

  const handleMenuItemClick = (action: (value: boolean) => void) => {
    action(true);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const appleWalletTarget =
    token && props.isOwn ? `/v1/asciipay.pkpass?session_token=${token}` : null;

  return (
    <>
      <ButtonGroup
        variant="outlined"
        size="large"
        ref={anchorRef}
        aria-label="split button"
      >
        {props.minimize ? null : (
          <Button
            startIcon={<ShoppingCartOutlined />}
            sx={{ whiteSpace: "nowrap", width: "9.52rem" }}
            onClick={() => setOpenPaymentModal(true)}
          >
            {t("account.action.payment")}
          </Button>
        )}
        <Button
          sx={{ whiteSpace: "nowrap", width: "3.5rem" }}
          onClick={handleToggle}
        >
          <MoreVert />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {props.minimize ? (
                    <MenuItem
                      onClick={() => handleMenuItemClick(setOpenPaymentModal)}
                    >
                      <ListItemIcon>
                        <ShoppingCartOutlined fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{t("account.action.payment")}</ListItemText>
                    </MenuItem>
                  ) : null}
                  <MenuItem
                    onClick={() => handleMenuItemClick(setOpenEditModal)}
                  >
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      {t("account.action.editAccount")}
                    </ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleMenuItemClick(setOpenAuthModal)}
                  >
                    <ListItemIcon>
                      <LockOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      {t("account.action.authenticationMethods")}
                    </ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleMenuItemClick(setOpenSessionModal)}
                  >
                    <ListItemIcon>
                      <Token fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      {t("account.action.activeSessions")}
                    </ListItemText>
                  </MenuItem>
                  {appleWalletTarget ? (
                    <MenuItem component="a" href={appleWalletTarget}>
                      <ListItemIcon>
                        <Wallet fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        {t("account.action.appleWallet")}
                      </ListItemText>
                    </MenuItem>
                  ) : null}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <UpdateAccountDialog
        account={props.account}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />

      <CreatePaymentDialog
        account={props.account}
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
      />

      <AccountAuthenticationDialog
        account={props.account}
        open={openAuthModal}
        setOpen={setOpenAuthModal}
      />

      <AccountSessionDialog
        account={props.account}
        open={openSessionModal}
        setOpen={setOpenSessionModal}
      />
    </>
  );
};
