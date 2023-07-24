import {
  Center,
  Button,
  HStack,
  Heading,
  Spinner,
  Text,
  Link,
  Image,
  VStack,
  Box,
  ScrollView,
  Flex,
  Skeleton,
} from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import NewsService from "../services/news";
import { RouteContext } from "../contexts/RouteProvider";
import SkeletonNews from "../components/news/SkeletonNews";

export default function News() {
  const { navigate } = useNavigation();
  const [news, setNews] = useState([]);
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
            <VStack key={i} space={6} px={2} w="100%" my={2}>
              <Text
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                fontSize={28}
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
                        rounded="md"
                        m="auto"
                      />
                      <Text
                        my={4}
                        px={4}
                        _dark={{ color: "white" }}
                        _light={{ color: "black" }}
                        fontWeight="bold"
                        fontSize={16}
                        numberOfLines={5}
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
