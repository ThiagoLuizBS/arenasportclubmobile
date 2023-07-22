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
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import NewsService from "../services/news";

export default function News() {
  const { navigate } = useNavigation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading news" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <ScrollView>
          {news.map((category: news, i) => (
            <VStack key={i} space={6} px={2} w="100%" my={2}>
              <Text
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                fontSize={24}
                fontWeight="bold"
                numberOfLines={5}
              >
                {category?._id.category}
              </Text>
              {category.news.map((news, i) => (
                <Link key={i} href={news?.href} isExternal w="100%">
                  <VStack w="100%">
                    <Image
                      source={{ uri: news?.img }}
                      alt={news?.title}
                      size="56"
                      rounded="md"
                      m="auto"
                    />

                    <Text
                      my={2}
                      _dark={{ color: "white" }}
                      _light={{ color: "black" }}
                      fontSize={16}
                      numberOfLines={5}
                    >
                      {news?.title}
                    </Text>
                  </VStack>
                </Link>
              ))}
            </VStack>
          ))}
        </ScrollView>
      )}
    </Box>
  );
}
