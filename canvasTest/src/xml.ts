// tslint:disable-next-line:max-line-length
const alert_bg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAmVBMVEUAAABLS0sODg4uLi4ODg5LS0sODg5LS0tKSkoODg5KSkpKSkpMTEwJCQk+Pj4ODg4ODg5MTExKSkpKSkoODg4ODg4ODg4qKioqKioHBwcHBwcODg4ODg5KSkpKSko0NDQzMzM/Pz9LS0sNDQ0yMjIRERFFRUU2NjY7OzsvLy8JCQlTU1NISEhBQUEFBQVQUFBPT08qKiohISEbCJ1eAAAAH3RSTlMA8vIFTOTjnlErSiv39/Lx6umuqqqgVfPxr66dnEkquyy0rAAAAQpJREFUOMvt09luwjAQBdAbnLXsa/c6mUxsx06g8P8fVxqQaCowr33oebSvNCPrGiciXUZBX7RMBS6GSUCqLfpaRUEyxNk7kZE1531cS0P0gM7DXEmW17BU8y70QaqWt9SKvsclJD00JYAYGfZk2IwEUpJ+lGJx2saz0QJRy9KH2whBkUufvAj+M38p0/oz3AaYNHe60UzwSHe6QU+I6U5XKcaL/tSezPH2GWHlvH/HVSHEmJ3hm5McjwWwtuyUlpzn/XfJWWrl2K4BZKU97FxTaN1fRBeN2x22ZYajcGarvWnot8bsKzsL0QnL0m5tWfV1Z2WIs+xtUF4zeM1wITareDr4aRqvNgKdL+xxheLbPqAYAAAAAElFTkSuQmCC`;
// tslint:disable-next-line:max-line-length
const alert_title_bg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAAAlCAMAAACzmG/LAAABFFBMVEVI6uQAAABj/Pcb1M1k/fdm/vhG6eRo//kb1M5q//pH//pO8uxc+fNT9e9I7+k/6uMw4dpY9/FE7OYo3NUs39gk2dI55t8049w25N4/7uho//k65+Eh2tMp3dcr4doy6eQ85+Ef1s9T8+0r3tdI6uRH6uQi2NId1M0Y0cob1M1D6uRJ7ucd2NI29O4b1M0y4dom4dol4Nkf2dId1s8d19Az4tse2NEi3NYi2NEj3tgg2tMh29Uj3dck39gb1s8g2tQf2NIZ1c4s3tcu39g1490v4Nom4tsb19AZ08w96uQX0stB7OU56eIn29VR8+016OIp3dZF7edV9O9O8es45d8k2tNv//0c2dJI7ugn491f9/Rl+veZaKi9AAAALnRSTlPyAOrz6ury6t7qAurq6urq4Orq3Nzb5+PmCvHqr6CEReroqY/l0s3CdWxZVz8aiCo0jQAAA5JJREFUaN7d12lXm0AUgGGiXdO9mrbuW/flok5ANDqBAIq0sbGG2Nr//z96ZzJQJwEGLU17eDV+i+c83DsT1WqiD+v35+fnpzK7kdHNlG6z13h3x5q6H/ck7kHSPamHSU/jHiUtrK4uLDxjvcCesx7HzbJmWI1GY6bxeul9vVafm5ur14f2lfWpweDnxbekk5MTfInOkr4POxV9Zi+p4/G+yH29nLF5KNqU2hId8HZ5+/v7O6wW1m61sb29c555fnQ5KnIch/9IAgx/hncWV2p1jNuXB4PBWd/tdqRclp+k6x4NMdc7CoIAHBE9ijOxc9PeZu3ttdst1g5rH9sVHcSuTUVbSdID4O0Maw3Dp8DbFpm8Jo8k4dMAEQ2Xa8K+Mbg4NlzEyRkjeT2HEKfX79Imy+QJK+NiMhnRLGHmbeXI1XasgN0WdhlPWRAXLtW4/e3gpMOsKrsO+CvMvu80i9t5/9JO4iQ64jeY/eNFMXo/ojh2t283RYldxreyBi/b1ansWKrdzLLDpZxwBe1Lg0J0zwdCwOIbL89dOXhBl/Gl2zHF3EHCL9a0Oc3z9SJ4Qglse75DRuwSntt5JS79Aa/o3G35vGfapz9p7057Knpy0RGjbyM9264efEKftJ2M2sNlbbGvF7B7Br4b8I6HSdkxyR7j1XYzwz6Kf6PNGoXsloPv9pBewN4u57LbuqbdluhZdsdZ0x7rBewcTX087JJ9HK+2l7r06p0nvxu1T2szRew+0knUt4jSjv1duzx49ed79uDR7qvtfOzg6nDJbsYhfXzu2KTsWObnO5Znb/hquk6RbhmEMvp/Yc9d+lLtTXbO2R0v2bN2vmw7di276qKf1u64SnqH/w+Dwy/VXuqBb0v2nAOvthvy2JFOPaCcrrS3J2DHxu3qA49dze5FDqFE7zkk1W5PwF74pi/b7geUgO5RItntIRy/URyHaF7Kn/Lp5MMfvEM51QrED4CXcuztLPxV7Z4F4EQGATnKI6M1RzKl9fjTbFuwJBuWgsQgNSK+hD0noxMAhD4EULkUdgwAgl63gnSl3YtQTQyoYko7YWOPqjh2bleOvRNCFcu3G11UBzqBSpZv9wOkR5W86FR2zwKAsFfNjc+3Gy6wi86EipY7d8CsXkU3XtjzLrqqHvZcu+EBQBhVduNz7VYAYHWhuqHdN1JzQwBS4Y1n9rVeJy03siwrsiqd9kq7lZpW+V7+AkDW3JV5n8WZAAAAAElFTkSuQmCC`;
// tslint:disable-next-line:max-line-length
const btn_close = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAqCAMAAAAZKoJqAAAC9FBMVEUAAAByLQNyLQNyLQN0LQNlJABtKgGDMwl4LwR/Mgh2LgRdHgBeIABeHwBvLAJmJgBgIABjIwBxLAJyLQNtKwFvLQJgIgBsKgFeHgBhIgBvLAJjIwBuLAJmJABpJwBrKQBvKwJuKwJxLQNxLQNyLQNzLQNqKQB7MAZtLAFiJQBdHQBnJQFwLQJrKQFvKwJxLAJxLQJyLQNyLQNyLQN4LwVtLAJvLQJwLQJyLQNyLQPsVSf////uZj3tVifsUifvVif/cyvwWyfuaEDuYjjxWCj++vrsUyTvZz7rVSjuZDrxVyeOLBDuWCeaMxOVMBK1HwXzXyf14N30a0D/dCz2ZSn1YijtVijpVCjHNheHMwnNaFbNelXIVUDtWCv5aCn0WSjSQB6cNBOXMRKSLxGQLRGONAztx8DMd1PJWkfFTzr/cCr4aSjsUSPXRSChNxSiOBOcNxGXNg+KOAv89fXkrKP/k3H+jWjKc0/JXUv/gkT9ekLyaj/tYDX6bijmUifsZyXpZCTgTSTMPh64Rxm+LxWgNhO8LROKKg+HKQ+SNQ1+MAZrKwD+/fzpu7TjqJ/hpZv/pof/n4D+l3X7hmD6gljKcErGbUi7ZUCyXzr1ZTLtXC/BRC/ZTyz/biv+ayr7ain8byj2bSjHQijVSSfkTybcTCXjYSPGPSHYXCDQPx2tThu4LhdxLQL68O7z2dTuycTqv7fmsaf/r5D+mnrTeWr6flLLYU/3azrrYTi3XTjGRS3XTCr0aSfCPyfwaCbIXSbdXiLaRyLbXCHTViCRQiDCOiDOVB7MWRzFThzHVRumShrCUxm8TBmxQRiqPhe2TRalOhbGNBafQxOoRxKWPhGcQA+POgxfJABXGAD89/b78vH24+Dswrv/tJjho5jgopfenJLclYnVhHjjjm3TdmbSdGTVg2D4dknxbkbDakbBaUX2cj2/STbeVjOmVjLZUzLzXy+cTCq+WCTcYyO5ViLSRCLLOBjENRikRRG2Jw+5Jgq3HAAlL8K8AAAAOnRSTlMAOQsE4aCH/f326ure1tK/vrhSINrXzsjHsquqoZeSjXZkRkEwHfTw7OTj07h7b1dNLigU87eaWkcTIfpVqgAABFZJREFUOMt9lGVYVEEUhgcQkC67u7tl3WRhgy0FJNzFdUPdcAMFUSREUhTpVClBQOzu7u7u7u4/zt6Zu/rww+/PnXvPO9+Zc859BiCN6NK5c2d7e/uOHdu39/Ly9GzXrl0bNzc3V9cBA1xc+vcGVtn0eVdSUlJcXPzqZVFRUeFcqBlQU6bMmALVONDWSnru3JSTk5ubuzkvLzo6OiYmJj+/oGBrwfPt20tLSyVJ13tizs7hSE4+j8PhTJjA4/H8sHh+Mr1eHxAQoK+41BWTw248jvaD2L9isRb4YtFCElsh0HZg4WYeDwEcEvSbHOBLShAUNZQgvT7efcHjEFwcJw6BMsjx2VSMRp7ub2up+8azmB3Ia9L776xJlsxlel8uP6GWz0XpmZ+vD4fleOzMWzABgTWaBym7OURmKnuhJlaOXWm6qMEAdD2yKQ6Dy8splDtrdn+AmbnsZPF6iuYrm0uQwfVtAXAp3OpHgHE15esoFMpE6Sw6dGyIXQ/XGuzKDHKyAa77XyPHt1LIWdA1s/js5JnoRVrDJ9AV5z1Am/3zce6I2RiVHpTH3kbrpWkJdEt6yXEX4PEJkgSaLCXRNOxImb13OZ+oKeS4K2j/BZOsHeJlGNg4HT39t4VNpaKSTroB+0aCZPHKBKFHl/kjBINPwyZTce9PtgFdTs2Dw2EtCIA9DMWuzRyJKXkCB0iyeDLLlCG6OvumFXwSxoUgUsUZL9Dt0jxoiD9QJ//WkAeIuAgdSa083xF0vzKvzAqy5TM3kJ7r4Aj+ko32wPsaw7qV3YDbYx0BGVlxuQvoERVEkvSFYtQerA0pMrqV7ApswhkCEtyFwdn4rNkpqzCq/eEAejkymM0c/Wfew65LU2ToAIyrg4GPk5aJyiYdl2z5tnoOdp1ztJZuCTKuDgEj+1Zicu9SBEaETQ0VZyPy1pswggy60h3YOVeh7NRVafcJR9hwagJyXRsh51IJ8po3AC32SXBFsrSNFH/UcDjYWH/K2vIG+EKQUT0gmSgh23nw58QIcQKdWNeK51Ae/oKOmITXSKu6EBrZ0FnVyWRf2KHVj6rJX0nAcLQBwP1AMCQxKuDjmOUAcl9STIZjLwDa1kOSFOLwGu1CpNMIADwWMZgQ/a+YWid4hw5SL6qCrv8nK/uOBKCDWaVKjG8WoiFxBQIBUxISUqF1toWk2pBxgaGj0WAYx7lUAZMpCY6MXKllQFXGVyU52wEwrl+4QaU4FC+Be4N1ukjdnj37EpPqDhw6fOzEmUVnz10wTFOITC2I+7N1S6Mo43B8Ul39sRMwZBQqA9PTMzLS0wMDVUqlSCkSKYwECXw6tTQJA0VKVSAhlSWkEAqF06BMQqHZnJmpdgdI3bIyDSIFjKWmphqMxlSTyZypDg9fvLhlU1NTVlZWv1ZDAZZ363CzGsYcYXCUc4vWbQd16DTGoVv3scN62Az3GW9rB6zyce/jPrqTwxDvnr16o8/N9QcHuAeRopztMgAAAABJRU5ErkJggg==`;
// tslint:disable-next-line:max-line-length
const cancel_bg = `data:image/png;base64,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`;
// tslint:disable-next-line:max-line-length
const sure_bg = `data:image/png;base64,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`;

export const pop = `
<Dialog width="444" sceneColor="#000" height="282" editorInfo="compId=1">
    <Image y="0" x="0" width="444" skin="${alert_bg}" sizeGrid="15,15,15,15" height="282"/>
    <Image y="0" x="0" width="444" skin="${alert_title_bg}" sizeGrid="9,88,9,139" height="37"/>
    <Label y="5" x="62" width="319" var="tipsTitle" text="提示" strokeColor="#000000" stroke="3.5"
    fontSize="26" color="#ffffff" bold="true" align="center"/>
    <Button y="0" x="406" var="btn_close" stateNum="1" skin="${btn_close}" editorInfo="compId=5"/>
    <Label y="70" x="40" wordWrap="true" width="362" var="tipsText" valign="middle" text=""
    leading="10" height="120" fontSize="20" color="#fff" bold="true" align="center"/>
    <Image y="204" x="254" skin="${sure_bg}" var="btn_confirm" editorInfo="compId=20"/>
    <Image y="205" x="52" var="btn_cancel" skin="${cancel_bg}" editorInfo="compId=26"/>
</Dialog>`;
