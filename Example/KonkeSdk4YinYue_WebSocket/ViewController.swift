//
//  ViewController.swift
//  KonkeSdk4YinYue_WebSocket
//
//  Created by weichengwu on 09/03/2023.
//  Copyright (c) 2023 weichengwu. All rights reserved.
//

import UIKit
import KonkeSdk4YinYue_WebSocket

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let manager = WebSocketManager(baseUrl: "2333")
        manager.reconnect()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

