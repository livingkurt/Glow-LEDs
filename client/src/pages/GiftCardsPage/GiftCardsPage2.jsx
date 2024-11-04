import { Box, Button, Container } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatPrice } from "../../utils/helper_functions";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import EditGiftCardModal from "./components/EditGiftCardModal2";
import { open_create_gift_card_modal, open_edit_gift_card_modal } from "../../slices/giftCardSlice2";
import { useCallback } from "react";
import * as API from "../../api";

const GiftCardsPage = () => {
  const dispatch = useDispatch();
  const giftCardPage = useSelector(state => state.giftCards.giftCardPage);
  const { loading, remoteVersionRequirement } = giftCardPage;

  const remoteApi = useCallback(options => API.getGiftCards(options), []);

  const columnDefs = [
    { title: "Code", display: giftCard => giftCard.code },
    { title: "Initial Balance", display: giftCard => formatPrice(giftCard.initialBalance) },
    { title: "Current Balance", display: giftCard => formatPrice(giftCard.currentBalance) },
    { title: "Source", display: giftCard => giftCard.source },
    {
      title: "Expiration",
      display: giftCard => (giftCard.expirationDate ? formatDate(giftCard.expirationDate) : "Never"),
    },
    { title: "Status", display: giftCard => (giftCard.isActive ? "Active" : "Inactive") },
    {
      title: "Actions",
      nonSelectable: true,
      display: giftCard => (
        <Box display="flex" justifyContent="flex-end">
          <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_gift_card_modal(giftCard))}>
            <Edit color="white" />
          </GLIconButton>
          <GLIconButton onClick={() => dispatch(API.deleteGiftCard(giftCard._id))} tooltip="Delete">
            <Delete color="white" />
          </GLIconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName="Gift Cards"
        namespaceScope="giftCards"
        namespace="giftCardTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_gift_card_modal())}>
            {"Create Gift Card"}
          </Button>
        }
      />

      <EditGiftCardModal />
    </Container>
  );
};

export default GiftCardsPage;
