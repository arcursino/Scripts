const moneyFormat = (valor) => valor !== '' ? 'R$' + parseFloat(valor).toFixed(2).replace(".", ",") : '';

const dateTimeFormat = (data) => {
    if (data !== '') {
        const d = new Date(data);
        const dia = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        const mes = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        const hora = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        const minuto = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        const segundos =
            d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        return (
            dia +
            '/' +
            mes +
            '/' +
            d.getFullYear() +
            ' ' +
            hora +
            ':' +
            minuto +
            ':' +
            segundos
        );
    } else return '';
}

const dateFormat = (data) => {
    if (data !== '') {
        const d = new Date(data);
        const dia = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        const mes = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        return (
            dia +
            '/' +
            mes +
            '/' +
            d.getFullYear() 
        );
    } else return '';
}

const groupDadosByDate = (ganhos, gastos) => {
    const gan = ganhos.map(item => 
        [new Date(item.data.split('T')[0]).getTime(), item.valor]
    )
    const gas = gastos.map(item => 
        [new Date(item.data.split('T')[0]).getTime(), item.valor]
    )
    const tempGan = groupArrayByDate(gan);
    const tempGas = groupArrayByDate(gas);

    return syncArrayByDate(tempGan,tempGas)
}

const groupArrayByDate = vet => {
    const temp = [];
    let ultimo = undefined;
    for(let i = 0; i < vet.length; i++){
        if( !ultimo )
            ultimo = [vet[i][0],vet[i][1]]
        else if( ultimo[0] === vet[i][0] )
            ultimo[1] += vet[i][1]
        else{
            temp.push(ultimo)
            ultimo = [vet[i][0],vet[i][1]]
        }
    }
    if( ultimo )
        temp.push(ultimo)
    return temp
}

let syncArrayByDate = (gan, gas) => {
    for(let i = 0; i < gan.length; i++ ){
        for(let j = 0; j < gas.length; j++ ){
            if( gan[i][0] === gas[j][0] ) break;
            else if( gan[i][0] < gas[j][0] ){
                gas.splice(j, 0, [gan[i][0],0] );
                break;
            }
            else if( j+1 === gas.length )
                gas.push([gan[i][0],0] );
        }
    }
    for(let i = 0; i < gas.length; i++ ){
        for(let j = 0; j < gan.length; j++ ){
            if( gas[i][0] === gan[j][0] ) break;
            else if( gas[i][0] < gan[j][0] ){
                gan.splice(j, 0, [gas[i][0],0] );
                break;
            }
            else if( j+1 === gan.length )
                gan.push([gas[i][0],0] );
        }
    }

    return [gan,gas]
}

export {
    moneyFormat,
    dateFormat,
    dateTimeFormat,
    groupDadosByDate
}
