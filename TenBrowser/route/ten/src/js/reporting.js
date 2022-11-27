/*****************************************************************************************/
// Reporting Logic
var report = {};

report.sid = settings.sid;
report.mid = settings.mid;
report.cid = localStorage.getItem('clientid') || 'xxxxxxxxxx.yyyyyyyyyy'.replace(/[xy]/g, function(c) { var r = Math.random()*10|0; return r.toString(); });
report.uid = localStorage.getItem('userid') || null;
report.srcid = localStorage.getItem('srcid') || nw.App.manifest.name.toLowerCase();
report.activated = localStorage.getItem('activated') || false;

report.getID = async function(callback)
{
    return new Promise(function(resolve){
        console.log('id called');
        if (!localStorage.birthday || !report.uid)
        {
            fetch('https://track.fourtiz.com/getID?msapp=' + nw.App.manifest.name.toLowerCase(),{
            method: 'GET'
            }).then((response) => {
                if (!response.ok)
                {
                    console.log('Bad GetID Response');
                    return;
                }
                else
                {
                    response.json().then(data => {
                        localStorage.setItem('userid', data.uid);
                        localStorage.setItem('srcid', data.channel);
                        report.uid = data.uid;
                        report.srcid = data.channel;
                        // GA Report
                        report.newUser();
                    });
                }
            }).then(resolve(true));
        }
        else
        {
            resolve(true);
        }
    });
};

report.geo = async function()
{
    return new Promise(function(resolve){
        console.log('geo called');
        var geo = localStorage.getItem('geo') || null;
        if (!geo)
        {
            fetch('https://us-central1-geoip-249408.cloudfunctions.net/geolocation', {
                method:'GET'
            }).then(response => response.json()).then(data => localStorage.setItem('geo', data.country)).then(resolve(true));
        }
        else
        {
            resolve(true);
        }
    });
};

report.activate = function()
{
    fetch('https://track.fourtiz.com/activation/' + report.uid,{
        method: 'GET'
    });
    report.activated = true;
    localStorage.setItem('activated', true);
};

report.alive = function()
{
    fetch('https://track.fourtiz.com/activationcounter/' + report.uid + '?alive',{
        method: 'GET'
    });
};

report.lives = function()
{
    fetch('https://track.fourtiz.com/activationcounter/' + report.uid + '?lives',{
        method: 'GET'
    });
};

report.event = function(eventCategory, eventValue)
{
    return new Promise(function(resolve){
        try
        {
            var geo = localStorage.getItem('geo') || '';
            fetch('https://www.google-analytics.com/mp/collect?measurement_id=' + report.mid + '&api_secret=' + report.sid,{
                method: 'POST',
                body: JSON.stringify({
                    client_id: report.cid,
                    events: 
                    [{
                        name: eventCategory,
                        params:
                        {
                            "app": nw.App.manifest.name,
                            "version": bVersion,
                            "srcid": report.srcid,
                            "uid": report.cid,
                            "geo": geo
                        }
                    }]
                })
            }).then(resolve(true));
        }
        catch (e)
        {
            console.log('Exception in GA Report');
            console.log(e, e.stack);
        }
    });
};

report.newUser = function()
{
    var birthday = localStorage.getItem('birthday');
    if (!birthday)
    {
        // New User - Another brick in the wall
        birthday = new Date().getTime();
        localStorage.setItem('birthday', birthday);
        report.event('NewUser');
        report.cid = 'xxxxxxxxxx.yyyyyyyyyy'.replace(/[xy]/g, function(c) { var r = Math.random()*10|0; return r.toString(); });
        localStorage.setItem('clientid', report.cid);
    }
};

report.HBTimeout = null;

report.heartbeat = function()
{
    var HBTimeLeft = 24*60*60*1000;

    var lastbeat = localStorage.getItem('lastbeat');
    if (!lastbeat)
    {
        // Still a new user - Play that funky music
        //report.event('Heartbeat');
        localStorage.setItem('lastbeat', new Date().getTime());
    }
    else
    {
        var now = new Date().getTime();
        if ((now - lastbeat) >= 24 * 60 * 60 * 1000)
        {
            // It's time for a heartbeat
            report.event('Heartbeat');
            localStorage.setItem('lastbeat', now);

            // Report Alive on Heartbeat
            report.alive();
        }
        else
        {
            // Patience young kimosabe
            HBTimeLeft = (24* 60 * 60 * 1000) - (now - lastbeat);
        }
    }

    global.clearTimeout(report.HBTimeout);
    report.HBTimeout = global.setTimeout(report.heartbeat, HBTimeLeft);
};

report.geo().then(report.getID).then(report.heartbeat);

/*****************************************************************************************/