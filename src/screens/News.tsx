import React, { useState, useEffect, useContext, useCallback } from "react";
import { Text, Link, Image, VStack, Box, ScrollView, Flex } from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RouteContext } from "../contexts/RouteProvider";
import NewsService from "../services/news";
import SkeletonNews from "../components/news/SkeletonNews";
import { useWindowDimensions } from "react-native";
import i18n from "../languages/I18n";

export default function News() {
  const { navigate } = useNavigation();
  const [news, setNews] = useState([]);
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const context = useContext(RouteContext);
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    NewsService.getAllNews().then((response) => {
      setNews(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      NewsService.getAllNews().then((response) => {
        setNews(response.data);
      });
    }, 606000);
    return () => clearTimeout(timer);
  });

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "emerald.100" }}
      flex={1}
      w="100%"
    >
      {loading ? (
        <SkeletonNews />
      ) : (
        <ScrollView>
          {news.map((category: news, i) => (
            <VStack key={i} space={4} px={2} w="100%" my={2}>
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 40 : 28}
                fontWeight="bold"
                numberOfLines={5}
              >
                {category?._id.category}
              </Text>
              <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
                {category.news.map((news, i) => (
                  <Link
                    key={i}
                    href={news?.href}
                    isExternal
                    w={
                      category.news.length % 2 === 1 && i === 0 ? "100%" : "50%"
                    }
                  >
                    <VStack w="100%">
                      <Image
                        source={{ uri: news?.img }}
                        alt={news?.title}
                        size={
                          category.news.length % 2 === 1 && i === 0
                            ? "56"
                            : "40"
                        }
                        rounded="xl"
                        m="auto"
                      />
                      <Text
                        my={4}
                        px={4}
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "black" }}
                        fontWeight="bold"
                        fontSize={width > 700 ? 24 : 14}
                      >
                        {news?.title}
                      </Text>
                    </VStack>
                  </Link>
                ))}
              </Flex>
            </VStack>
          ))}
        </ScrollView>
      )}
    </Box>
  );
}
