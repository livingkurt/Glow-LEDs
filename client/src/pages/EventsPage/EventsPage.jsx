import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_event_modal, open_edit_event_modal } from "../../slices/eventSlice";
import { EditEventModal } from "./components";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const EventsPage = () => {
  const eventPage = useSelector(state => state.events.eventPage);
  const { loading, remoteVersionRequirement } = eventPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: event => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveEvent({
                  ...event,
                  active: event.active ? false : true,
                })
              );
            }}
            tooltip={event.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={event.active} />
          </GLIconButton>
        ),
      },
      { title: "Name", display: "name" },
      { title: "Location", display: "location" },
      { title: "Start Date", display: "start_date" },
      { title: "End Date", display: "end_date" },
      {
        title: "",
        nonSelectable: true,
        display: event => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_event_modal(event));
              }}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteEvent(event.pathname))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getEvents(options), []);
  const remoteReorderApi = useCallback(options => API.reorderEvents(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Admin Events | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"events/setRemoteVersionRequirement"}
        tableName={"Events"}
        namespaceScope="events"
        namespace="eventTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect
        enableDragDrop
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_event_modal())}>
            Create Event
          </Button>
        }
      />
      <EditEventModal />
    </Container>
  );
};
export default EventsPage;
