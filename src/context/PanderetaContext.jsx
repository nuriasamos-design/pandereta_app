import React, { createContext, useContext, useState } from 'react';

// Fuente de verdad técnica según Orden 3
const CONOCIMIENTO_BASE = {
    notacion: {
        sistema: 'lineal',
        golpes: ['ti', 'co', 'TA', 'ris'], // adelante, pulgar, acentuado, riscado
    },
    organologia: {
        modelos: [
            {
                tipo: 'Profesional',
                diametro: '250mm',
                marco: '68mm',
                parche: 'Piel de cabra'
            },
            {
                tipo: 'Iniciación',
                diametro: '220mm',
                marco: 'Estándar',
                parche: 'Piel seleccionada'
            }
        ]
    },
    ritmos: {
        muineira: {
            nombre: 'Muiñeira',
            patron: 'TA-ti-co', // 3 golpes, el primero acentuado
            compas: '6/8'
        }
    }
};

const PanderetaContext = createContext();

export const PanderetaProvider = ({ children }) => {
    const [data, setData] = useState(CONOCIMIENTO_BASE);

    // Función para simular recuperación dinámica (futura conexión con NotebookLM)
    const refrescarConocimiento = async () => {
        // Aquí se llamarían a las herramientas de MCP NotebookLM
        console.log('Sincronizando con NotebookLM...');
    };

    return (
        <PanderetaContext.Provider value={{ data, refrescarConocimiento }}>
            {children}
        </PanderetaContext.Provider>
    );
};

export const usePandereta = () => {
    const context = useContext(PanderetaContext);
    if (!context) {
        throw new Error('usePandereta debe usarse dentro de un PanderetaProvider');
    }
    return context;
};
