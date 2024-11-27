'use client';

import Link from 'next/link';
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: 'linear-gradient(to bottom, #000000, #f5d719, #000000)',
  fontFamily: 'Arial, sans-serif',
  headerBgColor: '#000000',
  headerFontColor: '#ffd900',
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
      '¿Te gustaría saber sobre:?',
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
      'Contamos con clases de Yoga, Funcional, Zumba, Crossfit y Pilates. ¿Te gustaría seleccionar una? Puedes hacerlo desde aquí.',
    trigger: '4',
  },
  {
    id: '4',
    component: <Link href="/services">Clases</Link>,
    trigger: 'finOpciones',
  },

  // Membresías
  {
    id: 'membresias',
    message:
      'Poseemos dos tipos de membresías: premium y estándar. Puedes verlas desde aquí.',
    trigger: 'tiposMembresias',
  },
  {
    id: 'tiposMembresias',
    component: <Link href="/memberships" >Membresías</Link>,
    
    trigger: 'finOpciones',
  },

  // Registrarse
  {
    id: 'registrarse',
    message:
      'Puedes registrarte desde la opción en el botón superior derecho de la app o presionando aquí.',
    trigger: 'registrarseLink',
  },
  {
    id: 'registrarseLink',
    component: <Link href="/register">Registrarse</Link>,
    trigger: 'finOpciones',
  },

  // Contacto
  {
    id: 'contacto',
    message:
      'Puedes contactarnos a justdoit@gmail.com, por teléfono o WhatsApp al +1234567890, y también por nuestras redes sociales.',
    trigger: 'finOpciones',
  },

  // Sedes
  {
    id: 'sedes',
    message:
      'Estamos ubicados en Calle Falsa 1234. ¿Te gustaría saber algo más?',
    trigger: 'finOpciones',
  },

  {
    id: 'finOpciones',
    message: '¿Deseas finalizar o volver al menú?',
    trigger: 'opcionesFinalizar',
  },
  {
    id: 'opcionesFinalizar',
    options: [
      { value: 'finalizar', label: 'Finalizar', trigger: '10' },
      { value: 'volver', label: 'Volver al menú', trigger: 'reiniciar' },
    ],
  },

  {
    id: '10',
    message:
      '¡Gracias por tu consulta! Si necesitas algo más, no dudes en preguntar.',
    trigger: 'continuarConsultas',
  },

  {
    id: 'continuarConsultas',
    options: [
      { value: 'si', label: 'Sí, volver al menú', trigger: '2' },
      { value: 'no', label: 'No, eso es todo', trigger: '11' },
    ],
  },

  {
    id: '11',
    message: '¡Gracias por usar nuestro servicio! Hasta la próxima.',
    trigger: 'reinicio',
  },
  {
    id: 'reinicio',
    message: '¿Desea reiniciar el chat?',
    trigger: 'reinicioUnico',
  },
  {
    id: 'reinicioUnico',
    options: [{ value: 'si', label: 'Sí, reiniciar', trigger: 'reiniciar' }, ,],
  },

  {
    id: 'reiniciar',
    message: 'Reiniciando el chat...',
    trigger: '0',
  },

  {
    id: 'finalizado',
    message: '¿Te gustaría reiniciar el chat?',
    trigger: 'reiniciarOpciones',
  },

  {
    id: 'reiniciarOpciones',
    options: [
      { value: 'si', label: 'Sí, reiniciar', trigger: 'reiniciar' },
      { value: 'no', label: 'No, gracias', trigger: '11' },
    ],
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
          backgroundColor: '#ffd90083',
          color: '#000000',
          border: '1px solid #000000',
        }}
        bubbleStyle={{ backgroundColor: '#000000', color: '#FFD700' }}
      />
    </ThemeProvider>
  );
};

export default ChatBotComponent;
