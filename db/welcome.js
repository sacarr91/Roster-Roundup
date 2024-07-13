const lines = [` `,
    `W E L C O M E   T O   . . . `, ` `,
`|RRRRR.      .oOOOo.       .SSSSS.   |TTTTTTTTTTTT| |EEEEEEEE| |RRRRRR.`,
`|RRRRRR.   .OOo..oOO.     .SSSSSSS.  |TTTTTTTTTTTT| |EEEEEEEE| |RRRRRRR.`,
`|RR|  )R. .OOo.  .oOO.    .SSS.  .S.      |TT|      |EE|       |RR|  )RR.`,
`|RR| /R. .OOo.    .oOO.    .SSS.          |TT|      |EEEEE|    |RR| /RR`,
`|RR|/R.  .OOo.    .oOO.     .SSS.         |TT|      |EEEEE|    |RR|/R.`,
`|RR|.RR. .OOo.    .oOO. .S.   .SSS.       |TT|      |EE|       |RR|.RR.`,
`|RR| .RR. .OOo.  .oOO.  .SS.   .SSS.      |TT|      |EE|       |RR| .RR.`,
`|RR|  .RR. .OOo..oOO.    .SSSSSSSS.       |TT|      |EEEEEEEE| |RR|  .RR.`,
`|RR|   .RR.  'OOOO'       .SSSSS.         |TT|      |EEEEEEEE| |RR|   .RR.`,
`   `,
`|RRRRR.     .oOo.    |U|    |U| |N     |N| |DDDDD.        |U|    |U| |PPPp.`,
`|R|  )RR. .Oo.'.oO.  |U|    |U| |NN    |N| |DD|  DD.      |U|    |U| |PPPPPp.`,
`|R| /RR. .Oo.   .oO. |U|    |U| |N|N   |N| |DD|   DD. === |U|    |U| |P|  |PP.`,
`|RR/R.  .Oo.     .oO.|U|    |U| |N| N  |N| |DD|   DD. === |U|    |U| |P|  /PP.`,
`|R| RR. .Oo.     .oO.|U|    |U| |N|  N |N| |DD|   DD.     |U|    |U| |P|PPP.`,
`|R|  RR. .Oo.   .oO. |U|    |U| |N|   N|N| |DD|  dD.      |U|    |U| |P|`,
`|R|   RR. .Oo...oO.   .UUUUUU.  |N|    NN| |DD| dD.        .UUUUUU.  |P|`,
`|R|    RR.  'OOO'      .UUUU.   |N|     N| |DDDDD.          .UUUU.   |P|`,
``
];

function welcomeGraphic() {
 lines.forEach(line => console.info(line))  
 };

 module.exports = welcomeGraphic;

//  initiated here for testing
//  welcomeGraphic();
 