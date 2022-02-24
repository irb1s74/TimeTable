import React, {FC, memo, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Platform, View} from "react-native";

interface InputDateProps {
    show: boolean,
    date: string,
    setDate: (date: string) => void,
    setShow: (payload: boolean) => void
}

const InputDate: FC<InputDateProps> = memo(({date, setDate, show, setShow}) => {
    const onChange = (event: any, selectedDate: any) => {
        setShow(false);
        if (event.type === "set") {
            selectedDate = new Date(selectedDate)
            setDate(`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`)
        }
    };
    return (
        <View>
            {show && (
                <DateTimePicker
                    value={new Date(date)}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
});

export default InputDate;