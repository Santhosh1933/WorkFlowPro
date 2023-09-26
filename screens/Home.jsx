import {
  View,
  Text,
  Pressable,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../constant";
export default function Home() {
  const userId = 29;
  const [tasks, setTasks] = useState([]);

  async function getAllTasks() {
    const response = await fetch(`${API}/tasks/${userId}`);
    console.log(response);
    const dataJson = await response.json();
    setTasks(dataJson);
  }

  useEffect(() => {
    getAllTasks();
  }, [userId]);
  return (
    <View className="flex-1 px-4 bg-white">
      <View className="py-8">
        <Title title="Tasks" />
      </View>
      <TouchableHighlight>
        <View className="self-end flex flex-row justify-center items-center gap-2">
          <View className="bg-teal-900 self-end p-1 rounded-full">
            <Ionicons name="add" size={24} color="white" />
          </View>
          <Text>Add Task</Text>
        </View>
      </TouchableHighlight>

      {/*  "id": 1,
        "uid": 29,
        "title": "Sample Task",
        "description": "This is a sample task description.",
        "problem_link": "https://example.com/problem",
        "problem_mode": "easy",
        "yt_link": "https://youtube.com/sample-video" */}
      <FlatList
        className=" my-8"
        data={tasks}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View className="flex py-4 gap-3  my-1 bg-teal-50  px-4 border-b-2 border-teal-800">
            <View className="flex flex-row justify-between items-baseline">
              <Text className="text-xs">{item.date.substring(0, 10)}</Text>
              <Text className="text-xs">{item.time}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-lg font-bold">{item.title}</Text>
              <Text className="bg-green-200 rounded-t-md py-2 px-4 border-b-2 ">{item.problem_mode}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
