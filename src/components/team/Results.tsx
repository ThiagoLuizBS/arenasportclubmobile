import React, { Fragment, useEffect, useState } from "react";
import { Center, Divider, Pressable } from "native-base";
import MatchService from "../../services/match";
import SkeletonHome from "../home/SkeletonHome";
import { TextStylized } from "../results/NoMatchs";
import MatchTitle from "../results/MatchTitle";
import Match from "../results/Match";
import { useNavigation } from "@react-navigation/native";

type ResultsProps = {
  teamId: string;
};

export default function Results({ teamId }: ResultsProps) {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState<championshipDate[]>([]);

  useEffect(() => {
    MatchService.getPastMatchsByTeam(teamId).then((response) => {
      setMatchsData(response.data);
      setLoading(false);
    });
  }, [teamId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      MatchService.getPastMatchsByTeam(teamId).then((response) => {
        setMatchsData(response.data);
      });
    }, 15000);
    return () => clearTimeout(timer);
  });

  const haveMatchs = (date: championshipDate) => {
    if (date.matchs.length > 0) return true;
    else return false;
  };

  return (
    <>
      {loading ? (
        <SkeletonHome />
      ) : matchsData?.length === 0 ? (
        <Center px={2} my={4}>
          <TextStylized text={`NENHUMA PARTIDA ENCONTRADA`} />
          <TextStylized text={`PARA ESTA EQUIPE`} />
        </Center>
      ) : (
        matchsData?.map(
          (date, i) =>
            haveMatchs(date) && (
              <Fragment key={i}>
                <MatchTitle title={date._id.day} />
                {date.matchs.map((match, i) => (
                  <Pressable
                    key={i}
                    onPress={() =>
                      navigate("Match", { matchId: match.idMatch })
                    }
                  >
                    <Match match={match} />
                    {date.matchs.length !== i + 1 && (
                      <Divider
                        h={1}
                        _dark={{
                          bg: "blueGray.700",
                        }}
                        _light={{
                          bg: "emerald.700",
                        }}
                      />
                    )}
                  </Pressable>
                ))}
              </Fragment>
            )
        )
      )}
    </>
  );
}
