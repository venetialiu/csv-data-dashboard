/*
- parse CSV with papaparse
- check for general parsing errors (from papaparse)
- manual check:
    - CSV empty
    - incorrect / missing columns
    - clean & normalize rows
        - drop complete empty rows
        - normalize columns names to lower case (for the keys)
        - type conversion & remove white space
        - ensure values are not empty
*/

import { parse } from 'papaparse';

const parseCSV = ( file ) => {
    const REQUIRED_COLUMNS = ['date', 'product', 'quantity', 'revenue']

    return new Promise((resolve) => {
        parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const { data, errors } = results;

                // check for errors
                if (errors && errors.length > 0) {
                    const messages = errors.map(err => 
                        `Row ${err.row+1}: ${err.message}`
                    );
                    resolve({
                        ok: false,
                        error: messages.join('\n')
                    });
                    return;
                }

                // check if csv is empty
                if (!data || data.length === 0) {
                    resolve({
                        ok: false,
                        error: `CSV file is empty of invalid.`
                    });
                    return
                }

                // validate required columns
                const columns = results.meta.fields.map(c => c.toLowerCase().trim());
                // returns list of missing columns
                const missing = REQUIRED_COLUMNS.filter(col => !columns.includes(col))
                
                if (missing.length > 0) {
                    resolve({
                        ok:false,
                        error: `Missing columns: ${missing.join(',')}.`
                    });
                    return;
                }

                // clean & normalize rows
                const cleaned = data
                    .filter((row) => {
                        // (optional) drop completely empty rows
                        return REQUIRED_COLUMNS.some((key) => row[key]?.trim());
                    })
                    
                    .map((row) => {
                        // normalize column names to lower case
                        const normalized = {};
                        for (const key in row) {
                            normalized[key.toLowerCase().trim()] = row[key];
                        }

                        // remove white spaces & convert numeric strings to numbers
                        // ignores any extra columns
                        // data type conversion
                        const dateValue = normalized.date?.trim();
                        const parsedDate = dateValue ? new Date(dateValue) : null;
                        return {
                            date: parsedDate,
                            product: normalized.product?.trim(),
                            quantity: Number(normalized.quantity),
                            revenue: Number(normalized.revenue),
                        };
                    })

                    // ensure string fields are not empty & number fields are real numbers
                    .filter(
                        (r) =>
                        r.date &&
                        r.product &&
                        !Number.isNaN(r.quantity) &&
                        !Number.isNaN(r.revenue)
                    );
                
                if (cleaned.length === 0) {
                    resolve({
                        ok: false,
                        error: "No valid rows found after parsing."
                    });
                    return;
                }
            
                // successfully checked & cleaned data
                resolve({
                    ok: true,
                    data: cleaned
                });

            },
            error: (error) => {
                resolve({
                    ok: false,
                    error: "Unexpected error while reading file."
                });
            }
        });
    }); 
}

export default parseCSV;