import {
    request
} from "../requestV2";

function openAh() {
    ChatLib.command(`viewauction ${auc.seller}`)
}
import {
    Setting,
    SettingsObject
} from "../SettingsManager/SettingsManager";
auc = NaN
var setting = new SettingsObject("SkyblockAuctionFlipper", [{
        name: "Information",
        settings: [
            new Setting.Button("&5&lFlip&d&lFlop", "", () => {}),
            new Setting.Button("           &e&lSkyblockAuctionFlipper", "Ver 0.3.0", () => {}),
            new Setting.Button("&rThis mod is still in development.", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("If you have any issues you can contact me via discord:", "deandre#3930", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("&lHow to use:", "", () => {}),
            new Setting.Button("Chat messages will appear with the items that are considered flips, due to being lower", "", () => {}),
            new Setting.Button("in value then usual selling price. When these messages appear you can click to go to the auction", "", () => {}),
            new Setting.Button("To adjust how much you want to make in profit from these flips go to main in the settings menu.", "", () => {}),
        ]
    }, {
        name: "Settings",
        settings: [
            new Setting.Toggle("Enable Mod", true),
            new Setting.TextInput("Refresh Rate", "600"),
            new Setting.TextInput("Flip Minimum", "0"),
            new Setting.TextInput("Item price maximum (don't change if you don't want a cap on price)", "1000000000000"),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "&4&lReset Settings", function() {
                //setting.reset();
                //setting.load();
            })
        ]
    },
    {
        name: "Exclusions",
        settings: [
            new Setting.Button("&l(This feature is still in development and will not work yet)", "", () => {}),
            new Setting.Toggle("Enable Exclusions", false),
            new Setting.TextInput("Rarity", "Legendary"),
            new Setting.TextInput("Item", "Aspect of the dragons"),
            new Setting.TextInput("Reforges", "Fabled, Fierce"),
            new Setting.TextInput("Enchantments", "Any"),
            new Setting.Button("", "", () => {}),

        ]
    },
    {
        name: "Flip GUI",
        settings: [
            new Setting.Button("This feature is experimental, any feedback welcome.", "", () => {}),
            new Setting.Toggle("Enabled", false),
            new Setting.Button("", "&l&2[To Auction]", function() {
                try {
                    openAh()
                } catch (e) {}
            }),
            new Setting.Button("", "&l&4[Next]", function() {
                try {
                    auctionRoute()
                } catch (e) {}
            }),
            new Setting.Button("", "&l&4[Previous]", function() {
                try {
                    auctionRoutep()
                } catch (e) {}
            }),
        ]
    },
    {
        name: "Extras",
        settings: [
            new Setting.TextInput("Key: (Don't touch this!)", "Ldp9xUHrMi"),
        ]
    }
]);

setting.setCommand("afsettings").setSize(600, 200);
Setting.register(setting);




i = 0;
it_no = 0;
it_roll = 0
auctions = null;
prev_i = []
found = 0

register("renderOverlay", myRenderOverlay);

function myRenderOverlay() {
    if (setting.gui.isOpen() && setting.getSetting("Flip GUI", "Enabled") === true) {
        try {
            Renderer.drawString('&l&e Item: ' + auc.name, Renderer.screen.getWidth() / 2 - 200, Renderer.screen.getHeight() / 2 - 65);
            Renderer.drawString('&l&e Price: $' + numberWithCommas(auc.price), Renderer.screen.getWidth() / 2 - 200, Renderer.screen.getHeight() / 2 - 55);
            Renderer.drawString('&l&e Value: $' + numberWithCommas(auc.average_price), Renderer.screen.getWidth() / 2 - 200, Renderer.screen.getHeight() / 2 - 45);
        } catch (e) {}
    }
}

register("tick", ticker);

function Chatmsg(auc, isaf) {
  auc.name = (auc.name).replace(new RegExp("~", "g"), '&6✪')
  if (auc.rarity == 'VERY_SPECIAL') {
    auc.name = '&c'+ auc.name.split('VERY_SPECIAL')[0]
    auc.rarity = '&c&l' + auc.rarity
    auc.rarformat = '&c&l'
  }
  if (auc.rarity == 'SPECIAL') {
    auc.name = '&c'+ auc.name.split('SPECIAL')[0]
    auc.rarity = '&c&l' + auc.rarity
    auc.rarformat = '&c&l'
  }
  if (auc.rarity == 'MYTHIC') {
    auc.name = '&d'+ auc.name.split('MYTHIC')[0]
    auc.rarity = '&d&l' + auc.rarity
    auc.rarformat = '&d&l'
  }
  if (auc.rarity == 'LEGENDARY') {
    auc.name = '&6'+ auc.name.split('LEGENDARY')[0]
    auc.rarity = '&6&l' + auc.rarity
    auc.rarformat = '&6&l'
  }
  if (auc.rarity == 'EPIC') {
    auc.name = '&5'+ auc.name.split('EPIC')[0]
    auc.rarity = '&5&l' + auc.rarity
    auc.rarformat = '&5&l'
  }
  if (auc.rarity == 'RARE') {
    auc.name = '&9'+ auc.name.split('RARE')[0]
    auc.rarity = '&9&l' + auc.rarity
    auc.rarformat = '&9&l'
  }
  if (auc.rarity == 'UNCOMMON') {
    auc.name = '&2'+ auc.name.split('UNCOMMON')[0]
    auc.rarity = '&2&l' + auc.rarity
    auc.rarformat = '&2&l'
  }
  if (auc.rarity == 'COMMON') {
    auc.name = '&f'+ auc.name.split('COMMON')[0]
    auc.rarity = '&f&l' + auc.rarity
    auc.rarformat = '&f&l'
  }

function AdditionalInfo() {
  addition = ''
  if (auc.lore.includes('&k')) {
    addition+= `&r► ${auc.rarformat}&kg&r${auc.rarformat}RARITY UPGRADED&kg`
  }
  return addition
}
                  new Message(
                    new TextComponent(
                        `&l&f${auc.name}`
      ).setHover("show_text", auc.name + '\n' + auc.lore),
                          new TextComponent(
                              `| &6Profit: $${nFormatter(
                (auc.average_price - auc.price),1
              )}`).setHover("show_text", `&d&lFlip Stats:\n &r► &eCalculated Avg: &f$${nFormatter(auc.average_price,1)} \n &r► &ePrice: &f$${nFormatter(auc.price,1)} \n &r► &eTax: &f&4-$${nFormatter(auc.price/100,1)} \n &r► &eProfit: &a$${nFormatter((auc.average_price - auc.price) - (auc.price/100),1)} \n\n&r&lAdditional Stats: \n${AdditionalInfo()}\n\n${riskCalc(auc.average_price, auc.price)}`)
                      )
                      .setChatLineId(5050)
                      .chat();
  new Message(
          new TextComponent("&l&2[To Auction] ").setClick(
              "run_command",
              `/viewauction ${auc.seller}`
          )
      )
      .setChatLineId(5051)
      .chat();
  new Message(
          new TextComponent("&l&2[To Auction] ").setClick(
              "run_command",
              `/viewauction ${auc.seller}`
          )
      )
      .setChatLineId(5051)
      .chat();

if (isaf === true) {
new Message(
new TextComponent("&l&4[Next] ").setClick(
    "run_command",
    `/af`
)
).setChatLineId(5052)
.chat();
new Message(
    new TextComponent("&l&4[Prev] ").setClick(
        "run_command",
        `/afp`
    )
)
.setChatLineId(5053)
.chat();
}
  it_no = Math.floor(Math.random() * auctions.length);
  it_roll++
  found = 0
}
function ticker() {

    rr = 600
    if (parseInt(setting.getSetting("Settings", "Refresh Rate")) > 100) {
        rr = parseInt(setting.getSetting("Settings", "Refresh Rate"))
    }
    i++;
    if (i > rr && found === 0 && setting.getSetting("Settings", "Enable Mod") === true) {
        i = 0;
        exclusionsettings = 'false'
        if (setting.getSetting("Exclusions", "Enable Exclusions") == true) {
          exclusionsettings = `true&item=${setting.getSetting("Exclusions", "Item")}&rarity=${setting.getSetting("Exclusions", "Rarity")}&enchants=${setting.getSetting("Exclusions", "Enchantments")}&reforges=${setting.getSetting("Exclusions", "Reforges")}`
        }
        request({
            url: `http://localhost:3000/${setting.getSetting("Extras", "Key: (Don't touch this!)")}?Fmin=${setting.getSetting("Settings", "Flip Minimum")}&Fmax=${setting.getSetting("Settings", "Item price maximum (don't change if you don't want a cap on price)")}&exclusions=${exclusionsettings}`,
            json: true,
            connectTimeout: 1000,
        }).then(function(response) {
          if(response[0].name) {
            auctions = response;
          }
            found = 1
            try {
                auc = auctions[it_no];
                try {
                  ChatLib.clearChat(5050);
                  ChatLib.clearChat(5051);
                  ChatLib.clearChat(5052);
                  ChatLib.clearChat(5053);
                } catch (e) {}
              //  ChatLib.chat(((auc.name.split(' ')[auc.name.split(' ').length - 2]).split('').join(' ').replace(/[^0-9A-Z]+/gi, '')))
              //  if (!((auc.name.split(' ')[auc.name.split(' ').length - 2]).split('').join(' ').replace(/[^0-9A-Z]+/gi, '')) && !(auc.name.split('[')[1])) {
              //    star = '✪'
              //    auc.name = auc.name.replace(/[^0-9A-Z _]+/gi, '') + '&6&l' + star.repeat((auc.name.split(' ')[auc.name.split(' ').length - 2]).split('').length)
              //  }
                //make pet text in white
Chatmsg(auc, false)
            } catch (e) {
            }
        });
    }
}

register("command", auctionRoute).setName("af");

function auctionRoute() {
    try {

        auc = auctions[it_no];
        if (auc.name) {
                try {
                    ChatLib.clearChat(5050);
                    ChatLib.clearChat(5051);
                    ChatLib.clearChat(5052);
                    ChatLib.clearChat(5053);
                } catch (e) {}
Chatmsg(auc, true)
                prev_i.push(it_no)
                it_no = Math.floor(Math.random() * auctions.length);
        }
    } catch (e) {
        ChatLib.chat('No Auction Flips Found');
    }
}
register("command", auctionRoutep).setName("afp");

function auctionRoutep() {
    try {
        it_no = prev_i[it_roll - 1]
        auc = auctions[it_no];
        if (auc.name) {
                try {
                    ChatLib.clearChat(5050);
                    ChatLib.clearChat(5051);
                    ChatLib.clearChat(5052);
                    ChatLib.clearChat(5053);
                } catch (e) {}
  Chatmsg(auc, true)
                prev_i.push(it_no)
                it_no = Math.floor(Math.random() * auctions.length);
                it_roll = it_roll -1
        }
    } catch (e) {
        ChatLib.chat('No Auction Flips Found');
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var emojiStringToArray = function (str) {
  split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  arr = [];
  for (var i=0; i<split.length; i++) {
    char = split[i]
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
};

function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function riskCalc(val, price) {
  i = price / val
  risk = '&l&f[&4▇▇▇▇▇▇▇▇▇▇&f]'
  if (i > 0.1) {
    risk = '&l&f[&4▇▇▇▇▇▇▇▇▇-&f]'
  }
  if (i > 0.2) {
    risk = '&l&f[&4▇▇▇▇▇▇▇▇---&f]'
  }
  if (i > 0.3) {
    risk = '&l&f[&6▇▇▇▇▇▇▇----&f]'
  }
  if (i > 0.4) {
    risk = '&l&f[&6▇▇▇▇▇▇------&f]'
  }
  if (i > 0.5) {
    risk = '&l&f[&6▇▇▇▇▇--------&f]'
  }
  if (i > 0.6) {
    risk = '&l&f[&6▇▇▇▇---------&f]'
  }
  if (i > 0.7) {
    risk = '&l&f[&a▇▇▇-----------&f]'
  }
  if (i > 0.8) {
    risk = '&l&f[&a▇▇-------------&f]'
  }
  if (i > 0.9) {
    risk = '&l&f[&a▇--------------&f]'
  }
  return `&f&lRISK METER: \n${risk}\n&8This is meant as an indication of if the flip\n&8has risk of losing money through.`
}
