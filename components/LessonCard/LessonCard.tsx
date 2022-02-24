import React, {FC, memo} from 'react';
import {TimeTable} from "../../models/TimeTable";
import {
    View,
    Text,
} from 'react-native';
import styles from "../LessonCard/LessonCardStyles";

interface LessonCardProps {
    timeTable: TimeTable[]
}

const LessonCard: FC<LessonCardProps> = memo(({timeTable}) => {
    const getTimeLesson = (index: number) => {
        switch (index) {
            case 1:
                return '8:30-10:05';
            case 2:
                return '10:25-12:00';
            case 3:
                return '12:20-14:10';
            case 4:
                return '14:15-15:50';
            case 5:
                return '16:10-17:55';
            case 6:
                return '18:00-19:35';
            default:
                return "Каво?"
        }
    };
    return (
        <View style={styles.lessons}>
            {
                timeTable.map((lesson, index) => (
                    <View key={index}>
                        <Text style={styles.time}>
                            {getTimeLesson(lesson.num)}
                        </Text>
                        <View style={styles.lesson}>
                            <View style={styles.lesson_header}>
                                <Text style={styles.index}>
                                    {lesson.num}.
                                </Text>
                                <Text style={styles.subgroup}>
                                    {lesson.subgroup !== 0 && `подгруппа: ${lesson.subgroup} `}
                                </Text>
                            </View>
                            <Text style={styles.subject_name}>
                                {lesson?.subject_name}
                            </Text>
                            <View style={styles.lesson_footer}>
                                <Text style={styles.surname}>
                                    {lesson?.teacher_surname && lesson.teacher_surname + " "}
                                    {lesson.teacher_name && lesson.teacher_name.replace(/ /g, '').split('')[0] + "."}
                                    {lesson.teacher_secondname && lesson.teacher_secondname.replace(/ /g, '').split('')[0] + "."}
                                </Text>
                                <Text style={styles.room_name}>
                                    {lesson?.room_name && `${lesson.room_name} `}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            }
        </View>
    );
});

export default LessonCard;

