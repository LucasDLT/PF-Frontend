'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Component from '../bottom';

const theme = {
  background: 'linear-gradient(to bottom, #000000, #FFD700, #000000)',
  fontFamily: 'monospace',
  headerBgColor: '#000000',
  headerFontColor: '#FFD700',
  headerFontSize: '20px',
  botBubbleColor: '#000000',
  botFontColor: '#FFD700',
  userBubbleColor: '#FFD700',
  userFontColor: '#000000',
};

const config = {
  botAvatar: '/trainer.png',
  floating: true,
};

const steps = [
  {
    id: '0',
    message: '¡Hola! Bienvenido a Just Do It Gym. ¿Qué te gustaría consultar?',
    trigger: '1',
  },
  {
    id: '1',
    message:
      '¿Te gustaría saber sobre clases, membresías, registrarte en la app, contacto o sedes?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'clases', label: 'Clases', trigger: 'clases' },
      { value: 'membresias', label: 'Membresías', trigger: 'membresias' },
      {
        value: 'registrarse',
        label: 'Registrarte en la app',
        trigger: 'registrarse',
      },
      { value: 'contacto', label: 'Contacto', trigger: 'contacto' },
      { value: 'sedes', label: 'Sedes', trigger: 'sedes' },
    ],
  },

  // Clases
  {
    id: 'clases',
    message:
      'Contamos con clases de Yoga, Funcional, Zumba, Crossfit y Pilates. ¿Te gustaría seleccionar una? puedes hacerlo desde aqui',

    trigger: '4',
  },
  {
    id: '4',
    component: <Link href="/services">clases</Link>,
    trigger: '5',
  },
  {
    id: '5',
    message: 'deseas algo mas?',
    trigger: '6',
  },
  {
    id: '6',
    options: [
      { value: 'si', label: 'Sí', trigger: '6' },
      { value: 'no', label: 'No', trigger: '8' },
    ],
  },

  //membresias
  {
    id: 'membresias',
    message:
      'poseemos dos tipos de membresias: premium y standard. Puedes verlas desde aqui',
    trigger: 'tiposMembresias',
  },
  {
    id: 'tiposMembresias',
    component: <Link href="/memberships">membresias</Link>,
    trigger: '5',
  },

 // Registrarse
  {
    id: 'registrarse',
    message:
      'Puedes registrarte desde la opción en el botón superior derecho de la o presionando aquí.',
    trigger: '8',
  },
  {
    id: '8',
    options: [
      { value: 'si', label: 'Sí, volver al menú', trigger: '2' },
      { value: 'no', label: 'No, eso es todo', trigger: '10' },
    ],
  },

  // Contacto
  {
    id: 'contacto',
    message:
      'Puedes contactarnos a justdoit@gmail.com, por teléfono o WhatsApp al +1234567890, y también por nuestras redes sociales.',
    trigger: '10',
  },

  // Sedes
  {
    id: 'sedes',
    message:
      'Estamos ubicados en Calle Falsa 1234. ¿Te gustaría saber algo más?',
    trigger: '10',
  },

  // Finalización
  {
    id: '10',
    message:
      '¡Gracias por tu consulta! Si necesitas algo más, no dudes en preguntar.',
    end: true,
  },
];

const ChatBotComponent: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={steps}
        headerTitle="Just Do It Gym"
        {...config}
        style={{ display: 'flex', flexDirection: 'column' }}
        bubbleOptionStyle={{
          backgroundColor: '#FFD700',
          color: '#000000',
          border: '1px solid #000000',
        }}
        bubbleStyle={{ backgroundColor: '#000000', color: '#FFD700' }}
      />
    </ThemeProvider>
  );
};

export default ChatBotComponent;
