import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(15, 15, 20)',
        color: '#FFF',
        padding: 8,
        // boxSizing: 'border-box',
    },
    paragraph: {
        marginTop: 40,
        marginBottom: 18,
        marginLeft: 10,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#FFF',
    },

    daysWrapper: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 4,
    },
    day: {
        padding: 5,
        borderRadius: 5,
        width: 40,
        textAlign: 'center',
        color: '#FFF',
    },
    switchWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 30,
    },
    switch: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: 'rgb(201, 201, 201)',
        borderWidth: 2,
        borderRadius: 8,
        padding: 4,
    },
    section: {
        padding: 5,
        borderRadius: 5,
        width: 40,
    },
    section_active: {
        width: 40,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    section_text_active: {
        fontSize: 22,
        color: 'rgb(15, 15, 20)',
        fontWeight: '700',
        textAlign: 'center',
    },
    section_text: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
    },
    viewContainer: {
        backgroundColor: 'rgb(15, 15, 20)',
        height: "100%",
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    emptyTimeTable: {
        color: '#FFF',
        marginTop: 10,
        fontWeight: 'bold',
    }
});

export default styles;