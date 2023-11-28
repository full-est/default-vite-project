import React, { useState } from 'react'
import {
    chakra,
    Button,
    List,
    ListItem,
    Heading,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react'

export const Home = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')
    const [showCompleted, setShowCompleted] = useState(true)

    const createTodoHandler = (text) => {
        setTodos((prevState) => [...prevState, { id: Date.now(), text }])
        setText('')
        // a = [1,2,3] => b = [...[1,2,3], 4,5,6] = [1,2,3,4,5,6]
    }

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    const toggleTodoHandler = (id) => {
        let toggle = todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : { ...e }));
        setTodos(toggle);
    };

    const filteredTodos = todos.filter((todo) => {
        if (showCompleted) {
            return todo.completed;
        } else {
            return !todo.completed;
        }
    });
    return (
        <Flex
            flexDirection="column"
            h="100vh"
            w="100vw"
            m="1rem"
            gap="1rem"
            alignItems="center"
        >
            <Heading textTransform="uppercase">Todo List</Heading>
            <List
                h="60vh"
                w="70vw"
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                border="2px solid black"
                borderRadius="md"
                p="10px"
            >
                {filteredTodos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid gray"
                        py="8px"
                    >
                        <Text style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTodoHandler(todo.id)}>{todo.text}</Text>
                        <Button
                            onClick={() => removeTodoHandler(todo.id)}
                            background="red.500"
                            color="white"
                            _hover={{
                                background: 'red.600',
                            }}
                        >
                            Удалить
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Flex gap="10px">
                <Button
                    onClick={() => setShowCompleted(true)}
                    background={showCompleted ? "blue.500" : "gray.300"}
                    color="white"
                    _hover={{
                        background: showCompleted ? 'blue.600' : 'gray.400',
                    }}
                >
                    Показать выполненные
                </Button>
                <Button
                    onClick={() => setShowCompleted(false)}
                    background={!showCompleted ? "blue.500" : "gray.300"}
                    color="white"
                    _hover={{
                        background: !showCompleted ? 'blue.600' : 'gray.400',
                    }}
                >
                    Показать невыполненные
                </Button>
            </Flex>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault() // Без перезагрузки приложения после добавления задачи
                    createTodoHandler(text)
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
            >
                <Input
                    placeholder="Напишите задачу..."
                    maxLength={80}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="300px"
                    h="32px"
                />
                <Button
                    isDisabled={!text.trim().length}
                    type="submit"
                    w="fit-content"
                    background="blue.500"
                    color="white"
                    _hover={{
                        background: 'blue.600',
                    }}
                >
                    Добавить задачу
                </Button>
            </chakra.form>
        </Flex>
    )
}