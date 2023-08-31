import { Button, Divider, Modal, Pressable, Text } from "native-base";
import { Fragment } from "react";
import Match from "../results/Match";
import MatchTitle from "../results/MatchTitle";
import i18n from "../../languages/I18n";

type ModalDiscoverProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  matchsData: never[];
  setSelectedMatch: React.Dispatch<React.SetStateAction<string>>;
  setRunPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalDiscover({
  modalVisible,
  setModalVisible,
  width,
  matchsData,
  setSelectedMatch,
  setRunPrompt,
}: ModalDiscoverProps) {
  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
      size="xl"
    >
      <Modal.Content>
        <Modal.Header
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "success.100" }}
        >
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 40 : 20}
            fontWeight="bold"
          >
            {i18n.t("Prever1")}
          </Text>
        </Modal.Header>
        <Modal.Body
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "success.100" }}
        >
          {matchsData?.map((championship: championshipMatchs, i) => (
            <Fragment key={i}>
              {championship?.matchs.map(
                (match, i) =>
                  match.status === "A REALIZAR" && (
                    //   || match.status === "AO VIVO"
                    <Pressable
                      key={i}
                      onPress={() => {
                        setSelectedMatch(match.idMatch), setModalVisible(false);
                        setRunPrompt(true);
                      }}
                    >
                      <Match match={match} />
                      <Divider
                        h={1}
                        _dark={{
                          bg: "blueGray.700",
                        }}
                        _light={{
                          bg: "emerald.700",
                        }}
                      />
                    </Pressable>
                  )
              )}
            </Fragment>
          ))}
        </Modal.Body>
        <Modal.Footer
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "success.100" }}
        >
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="danger"
              fontWeight="bold"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              {i18n.t("Cancelar")}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
