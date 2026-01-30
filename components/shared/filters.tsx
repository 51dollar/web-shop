
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckboxFiltersGroup, FilterCheckbox, PriceRangeFilter, Title } from '.';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

    return (
        <div className={cn('', className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            <div className="flex flex-col gap-2">
                <p className="font-bold mb-1">Condition</p>
                <FilterCheckbox text="New" value="1" />
                <FilterCheckbox text="Used" value="2" />
            </div>

            <div className="mt-2 border-y border-y-neural-100 py-2 pb-2">
                <PriceRangeFilter />
            </div>

            <div>
                <CheckboxFiltersGroup
                    className="mt-2"
                    title="Models"
                    limit={6}
                    defaultItems={[
                        {
                            text: '15',
                            value: '1'
                        },
                        {
                            text: '15 pro',
                            value: '2'
                        },
                        {
                            text: '16e',
                            value: '3'
                        },
                        {
                            text: '16',
                            value: '4'
                        },
                        {
                            text: '16 pro',
                            value: '5'
                        },
                        {
                            text: '17',
                            value: '6'
                        },
                        {
                            text: '17 pro',
                            value: '7'
                        },
                    ]}
                    items={[
                        {
                            text: '15',
                            value: '1'
                        },
                        {
                            text: '15 pro',
                            value: '2'
                        },
                        {
                            text: '16e',
                            value: '3'
                        },
                        {
                            text: '16',
                            value: '4'
                        },
                        {
                            text: '16 pro',
                            value: '5'
                        },
                        {
                            text: '17',
                            value: '6'
                        },
                        {
                            text: '17 pro',
                            value: '7'
                        },
                    ]}
                />
            </div>
        </div>
    );
};