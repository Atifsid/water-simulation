"use client"
import React, { useEffect, useState } from 'react';
import styles from '../component/containers.module.css'

const Containers = () => {
    const TankCapacity = 1000;
    const WaterFlowRate = 25;

    const [waterLevels, setWaterLevels] = useState(Array(4).fill(0));
    const [redistributedWater, setredistributedWater] = useState<number | null>(null)

    useEffect(() => {
        const totalFilledWater = waterLevels.reduce((acc, curr) => acc + curr, 0);
        const redistributedWater = totalFilledWater / waterLevels.length;
        setredistributedWater(redistributedWater)
    }, [waterLevels]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWaterLevels(Array(4).fill(redistributedWater));
        }, 1000);

        return () => clearTimeout(timer)
    }, [redistributedWater])

    const addWater = (index: number) => {
        const timer = setTimeout(() => {
            if (waterLevels[index] <= TankCapacity) {
                setWaterLevels(prevLevels => {
                    const newLevels = [...prevLevels];
                    newLevels[index] = Math.min(TankCapacity, newLevels[index] + 200);
                    return newLevels;
                });
            }
        }, 1000);

        return () => clearTimeout(timer)
    };

    const removeWater = (index: number) => {
        setWaterLevels(prevLevels => {
            const newLevels = [...prevLevels];
            newLevels[index] = 0;
            return newLevels;
        });
    };

    return (
        <div className='flex flex-row gap-10 flex-wrap'>
            {waterLevels.map((waterLevel, index) => (
                <div key={[0, 1, 2, 3].at(index)} className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-5'>
                        <button onClick={() => addWater(index)} className='p-2 bg-green-800 rounded-3xl'>
                            <div className='text-center text-white'>Add</div>
                        </button>

                        <button onClick={() => removeWater(index)} className='p-2 border-2 border-red-500 rounded-3xl'>
                            <div className='text-red-500 text-center'>Empty</div>
                        </button>
                    </div>

                    <div className={`${styles.waterBox} justify-items-center`} style={{ height: '300px' }}>
                        <div className={`${styles.box} border-4 rounded-2xl`}></div>
                        <div className='text-center text-black'>{`${waterLevel}L`}</div>

                        <div className={`${styles.water} ${(waterLevel / TankCapacity) * 100 > 0 ? 'border-4' : ''} rounded-2xl`} style={{ height: `${(waterLevel / TankCapacity) * 100}%`, bottom: 0 }}>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Containers;
