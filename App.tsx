import {
    ActivityIndicator,
    Button,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./assets/styles";
import LessonCard from "./components/LessonCard/LessonCard";
import {TimeTable} from "./models/TimeTable";
import InputDate from "./components/UI/Date";
import TimeTableService from "./api/TimeTableService";

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0')
const day = String(date.getDate()).padStart(2, '0');
const daysOfTheWeek = ['ПН', "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

const App = () => {
    const [activeDay, setActiveDay] = useState<string>(`${year}-${month}-${day}`);
    const [timeTable, setTimeTable] = useState<TimeTable[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false)
    const week = useMemo(() => {
        let current = new Date(activeDay);
        current.setDate(current.getDate() - current.getDay() + 1);
        return Array(6).fill(0).map(() => {
            const date = new Date(current);
            current.setDate(current.getDate() + 1);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        })
    }, [activeDay]);

    const fetchTimeTable = async (date: string) => {
        setIsLoading(true)
        const monday = new Date(date);
        monday.setDate(monday.getDate() - monday.getDay() + 1);
        const response = await TimeTableService.fetchTimeTable(`${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`);
        if (response) {
            setTimeTable(response.data)
        }
        setIsLoading(false)

    }
    useEffect(() => {
        fetchTimeTable(activeDay)
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        fetchTimeTable(activeDay)
        setRefreshing(false);
    };
    const propsActiveDay = useMemo(() => activeDay, [activeDay])
    const propsSetActiveDay = useCallback((day: string) => {
        setActiveDay(day)
        fetchTimeTable(day)
    }, [])
    const propsSetShowDataPicker = useCallback((payload) => setShowDatePicker(payload), [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <View style={styles.header}>
                    <Text style={styles.paragraph}>19СПИ-2</Text>
                    <Button title="📅" color={'#FFF'} onPress={() => setShowDatePicker(true)}/>
                </View>
                <InputDate
                    date={propsActiveDay}
                    setDate={propsSetActiveDay}
                    show={showDatePicker}
                    setShow={propsSetShowDataPicker}
                />
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
                        <View style={styles.horizontal}>
                            <ActivityIndicator size="large" color="#FFF"/>
                        </View>
                    ) :
                    timeTable.length > 0 && (
                        <LessonCard timeTable={timeTable.filter(lesson => lesson.date === activeDay)}/>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    );
}


export default App
