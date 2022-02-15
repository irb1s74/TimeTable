import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from "react";
import styles from "./assets/styles";
import Card from "./components/LessonCard/LessonCard";
import LessonCard from "./components/LessonCard/LessonCard";
import {TimeTable} from "./models/TimeTable";

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0')
const day = String(date.getDate()).padStart(2, '0');
const daysOfTheWeek = ['ПН', "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

export default function App() {
    const [activeDay, setActiveDay] = useState<String>(`${year}-${month}-${day}`);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timeTable, setTimeTable] = useState<TimeTable[] | []>([])
    const [refreshing, setRefreshing] = useState(false);
    let current = new Date();
    current.setDate(current.getDate() - current.getDay() + 1);
    const week = Array(6).fill(0).map(() => {
        const date = new Date(current);
        current.setDate(current.getDate() + 1);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    })
    const fetchTimeTable = async () => {
        setIsLoading(true)
        await fetch(`https://api.ptpit.ru/timetable/groups/122/${year}-${month}-${date.getDate() - date.getDay() + 1}`)
            .then(async (response) => {
                setTimeTable(await response.json())
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchTimeTable();
    }, [])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchTimeTable();
        setRefreshing(false);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text style={styles.paragraph}>19СПИ-2</Text>
                <View>
                    <View style={styles.daysWrapper}>
                        {daysOfTheWeek.map((day, index) => (
                            <Text key={index} style={styles.day}>{day}</Text>
                        ))}
                    </View>
                    <View style={styles.switchWrapper}>
                        <View style={styles.switch}>
                            {week.map((day, index) => (
                                <TouchableOpacity
                                    style={
                                        activeDay === day
                                            ? styles.section_active
                                            : styles.section
                                    }
                                    key={index}
                                    onPress={() => {
                                        setActiveDay(day);
                                    }}
                                >
                                    <Text
                                        style={
                                            activeDay === day
                                                ? styles.section_text_active
                                                : styles.section_text
                                        }>

                                        {day.split('-')[2]}
                                    </Text>
                                </TouchableOpacity>
                            ))
                            }
                        </View>
                    </View>
                    {isLoading ? (
                        <View style={styles.viewContainer}>
                            <ActivityIndicator size="large" color="#FFF"/>
                        </View>
                    ) : timeTable.length > 0 ? (
                        <LessonCard timeTable={timeTable.filter(lesson => lesson.date === activeDay)}/>
                    ) : (
                        <View style={styles.viewContainer}>
                            <Text style={styles.emptyTimeTable}>Нет расписания</Text>
                        </View>
                    )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



