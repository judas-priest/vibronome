
function OnStart()
{
	//Слой
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
    lay.SetBackColor( '#000000' );
	//Поле ввода
	edt = app.CreateTextEdit( "60", 0.3, 0.05 );
	edt.SetTextColor( "#000000" );
	edt.SetBackColor( "#ffffff" );
	lay.AddChild( edt );
	
	//Кнопка
    btn_start = app.CreateButton( 'Старт', 0.32 )
    btn_start.SetStyle( "#666666", "#666666", 0 );
	btn_start.SetOnTouch( btnStart_OnTouch );
	
    chk_strobe = app.CreateCheckBox( 'Стробоскоп' );
    chk_strobe.SetOnTouch( () => strobe = !strobe );

	
	//Добавить на слой
	lay.AddChild( btn_start );
    lay.AddChild( chk_strobe );


	app.AddLayout( lay );
	
	timerId = null
	strobe = false

}

function btnStart_OnTouch()
{
    btn_start.SetText( 'Стоп' )
    btn_start.SetOnTouch( btnStop_OnTouch );
        
    vibroMs = 60 / edt.GetText() * 1000
    
    app.ShowPopup( edt.GetText() + ' ударов в минуту' )
    //for(;;){
     timerId = setInterval( () => 
     {
         if(strobe === true){
          lay.SetBackColor( '#ffffff' );   
         }
         app.Vibrate( '0,70' );
         lay.SetBackColor( '#000000' );
         
     }, vibroMs );
    //    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
    //}
}
function btnStop_OnTouch()
{
    app.ShowPopup( 'Остановлено' )
    btn_start.SetText( 'Старт' )
    btn_start.SetOnTouch( btnStart_OnTouch );
    	
    clearInterval(timerId)
}
